import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import create from "zustand";
import { db } from "../firebase.config";
import { isFollowing } from "../tools/toolRelations";
import toolGetDocs from "./toolGetDocs";
import toolPostAdder from "./toolPostAdder";
import toolRemoveDoc from "./toolRemoveDoc";
import toolRemoveFile from "./toolRemoveFile";
import toolUpdatedoc from "./toolUpdateDoc";
import useRelations from "./useRelations";
import useSettings from "./useSettings";
import useUser from "./useUser";

const store_ = create((set) => ({
  body: "",
  posts: [],
  postsLimit: 4,
  full: false,
  uploadVids: false,
  set: (data) => set(data),
  setState: set,
}));

export default function usePost() {
  const store = store_();
  const {
    set,
    setState,
    body,
    imgs,
    privacy,
    lastPost,
    postsLimit,
    posts,
    vids,
  } = store;
  const { user } = useUser();
  const { settings, getUserSettings, ...se } = useSettings();
  const { relations } = useRelations();

  function initPrivatePosts() {
    const q = query(
      collection(db, "posts"),
      where("postBy", "==", user?.uid),
      where("privacy", "==", "Only_me")
    );
    return onSnapshot(q, (snap) => {
      const privatePosts = snap?.docs?.map((d) => ({
        ...d?.data(),
        id: d?.id,
      }));
      set({ privatePosts });
    });
  }

  function initPosts() {
    const blockedPosts = settings?.blockedposts || [];
    const blockedUsers = settings?.blockedusers || [];
    const blocked = blockedUsers?.concat(blockedPosts);

    const q = query(
      collection(db, "posts"),
      where("postBy", "not-in", blocked?.length == 0 ? [""] : blocked),
      limit(postsLimit),
      orderBy("postBy", "asc"),
      orderBy("timestamp", "desc")
    );

    return onSnapshot(q, (snap) => {
      let snapPosts = snap?.docs?.map((d) => {
        return { ...d?.data(), id: d?.id };
      });

      const removed = [];
      snap.docChanges().forEach((change) => {
        if (change.type == "removed") {
          const x = { id: change.doc.id, ...change.doc?.data() };
          removed?.push(x);
        }
      });

      const lastPost = snap?.docs?.[snap?.docs?.length - 1];
      setState((p) => {
        let prevPosts = p?.posts?.filter((p) => {
          if (snapPosts?.find((i) => i?.id == p?.id)) {
            return false;
          } else {
            return true;
          }
        });

        removed?.map((r) => {
          prevPosts = prevPosts?.filter((p) => p?.id != r?.id);
        });

        return { posts: [...prevPosts, ...snapPosts], lastPost };
      });
    });
  } // end of init post

  async function loadMorePost() {
    console.log("load more . . . ");
    if (!lastPost) return;
    const blockedPosts = settings?.blockedposts || [];
    const blockedUsers = settings?.blockedusers || [];

    const blocked = blockedUsers?.concat(blockedPosts);
    const q = query(
      collection(db, "posts"),
      where("postBy", "not-in", blocked?.length == 0 ? [""] : blocked),
      limit(postsLimit),
      orderBy("postBy", "asc"),
      orderBy("timestamp", "desc"),
      startAfter(lastPost)
    );

    return onSnapshot(q, (snap) => {
      const posts = snap?.docs?.map((d) => {
        if (user) {
        }
        return { ...d?.data(), id: d?.id };
      });

      if (posts?.length == 0) {
        set({ full: true });
        return;
      }
      const lastPost = snap?.docs?.[snap?.docs?.length - 1];
      setState((p) => {
        const x = p?.posts?.filter((p) => {
          if (posts?.find((i) => i?.id == p?.id)) {
            return false;
          } else {
            return true;
          }
        });
        snap.docChanges().forEach((change) => {
          if (change.type === "added") {
            // console.log("New city: ", change.doc.data());
          }
          if (change.type === "modified") {
            // console.log("Modified city: ", change.doc.data());
          }
          if (change.type === "removed") {
            // console.log("Removed city: ", change.doc.data());
          }
        });
        return { posts: [...x, ...posts], lastPost };
      });
    });
  } // end of loadMorePost

  async function addPost(to, caller) {
    if (!body) return;

    set({ loading: true });

    const data = {
      body,
      userId: [user?.uid],
      postBy: user?.uid,
      edited: false,
      privacy: privacy || settings?.seeFuturePost,
    };

    if (to) {
      data.to = to;
      data.userId[1] = to;
    }

    for (let i in data) {
      if (data?.[i] === undefined) {
        alert(`${i} must not be undefined or null. `);
        return set({ loading: false });
      }
    }

    set({ body: "", loading: false });
    await toolPostAdder(data, imgs, "posts", (addedDoc) => {
      set({ uploadedPost: addedDoc?.id });
      caller?.(addedDoc);
      if ((ind) => imgs?.length) {
        set({ imgs: null, body: "" });
        set({ loading: false });
      }
    });
  } // end of add post

  async function removePost(id, imgs, vids, caller) {
    const ret = await toolRemoveDoc("posts", id, (id) => {
      caller?.(id);
      setState((p) => {
        const posts = p?.posts?.filter((p) => p?.id !== id);
        return { posts };
      });
    });

    if (imgs) {
      imgs?.map(async (img) => {
        toolRemoveFile(`files/posts/${id}/${img?.ind}`);
      });
    }
    const comments = await toolGetDocs("comments", where("postId", "==", id));
    comments?.map((com) => {
      toolRemoveDoc("comments", com?.id);
      if (com?.images) {
        com?.images?.map((img) => {
          toolRemoveFile(`files/comments/${com?.id}/${img?.ind}`);
        });
      }
    });

    const reps = await toolGetDocs("replies", where("postId", "==", id));
    reps?.map((rep) => {
      toolRemoveDoc("replies", rep?.id);
      if (rep?.images) {
        rep?.images?.map((img) => {
          toolRemoveFile(`files/replies/${rep?.id}/${img?.ind}`);
        });
      }
    });
    return ret;
  } // end of remove post

  async function postPrivacyCheck(data, userSettings) {
    const { privacy, to, postBy } = data;

    if (!user) {
      if (privacy == "Public") {
        return true;
      } else {
        return false;
      }
    }

    if (data?.postBy == user?.uid || to == user?.uid) {
      return true;
    }

    if (userSettings?.blockedposts?.find((p) => p == user?.uid)) {
      return false;
    }

    if (settings?.blockedposts?.find((p) => p == postBy)) {
      return false;
    }

    if (privacy == "Followers") {
      if (relations?.followings?.find((p) => p == data?.postBy)) {
        if (to) {
          return await checkOtherPost();
        } else {
          return true;
        }
      } else {
        return false;
      }
    } else if (privacy == "Public") {
      if (to) {
        return await checkOtherPost();
      } else {
        return true;
      }
    } else {
      return false;
    }

    async function checkOtherPost() {
      const userSettings = await getUserSettings(to);
      const priv = userSettings?.seeOtherPost;
      if (priv == "Followers") {
        return isFollowing(to, relations);
      } else if (priv == "Public") {
        return true;
      } else {
        return false;
      }
    }
  } // end of checkPostPrivacy

  async function updatePost(
    prev,
    body,
    images,
    docId,
    imgLength,
    privacy,
    caller
  ) {
    await toolUpdatedoc("posts", docId, {
      prev,
      body,
      images,
      imgLength,
      privacy,
    });
    caller?.();
    return caller;
  }

  return {
    ...store,
    initPosts,
    loadMorePost,
    initPrivatePosts,
    addPost,
    removePost,
    updatePost,
    postPrivacyCheck,
  };
}
