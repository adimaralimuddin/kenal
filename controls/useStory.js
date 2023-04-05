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
import toolUpdatedoc from "./toolUpdateDoc";
import useRelations from "./useRelations";
import useSettings from "./useSettings";
import useUser from "./useUser";

const store_ = create((set) => create({ body: "", set: (data) => set(data) }));
export default function useStory() {
  const { user } = useUser();
  const { settings, getUserSettings } = useSettings();
  const store = store_();
  const { set, last, stories } = store;
  const { relations } = useRelations();

  function loadFirst() {
    const blockstories = settings?.blockedstories;
    const blockedUsers = settings?.blockedusers;
    const blockedLists = blockstories?.concat(blockedUsers);
    if (!blockedLists) return;
    const q = query(
      collection(db, "stories"),
      where(
        "userId",
        "not-in",
        blockedLists?.length != 0 ? blockedLists : ["xxxxxxxxxx"]
      ),
      limit(4),
      orderBy("userId", "asc"),
      orderBy("timestamp", "desc")
    );
    const ret = onSnapshot(q, (snap) => {
      let last = snap?.docs[snap?.docs?.length - 1];
      const stories = snap?.docs?.map((d) => ({ ...d?.data(), id: d.id }));

      set({
        last,
        stories,
      });
    });

    return ret;
  }

  async function fetchNext(caller) {
    const blockedStories = settings?.blockedstories;
    const blockedUsers = settings?.blockedusers;
    const blockedLists = blockedStories?.concat(blockedUsers);

    if (!blockedLists) return caller?.([]);
    if (!last) return caller?.([]);
    console.log("fetchNext . . .");
    const q = query(
      collection(db, "stories"),
      where(
        "userId",
        "not-in",
        blockedLists?.length != 0 ? blockedLists : ["xxxxxxxxxx"]
      ),
      limit(4),
      orderBy("userId", "asc"),
      orderBy("timestamp", "desc"),
      startAfter(last)
    );
    onSnapshot(q, (snap) => {
      const docs = snap?.docs?.map((d) => ({ ...d?.data(), id: d?.id }));

      const n = stories?.concat(docs);
      let last = snap?.docs[snap?.docs?.length - 1];
      set({
        last,
        stories: n,
      });
      caller?.(docs);
    });
  }

  async function addStory(data_, clear) {
    const data = {
      body: data_?.body,
      userId: user?.uid,
      likes: [],
      loves: [],
      viewers: [],
      privacy: data_?.privacy,
    };
    console.log("data ", data);
    if (data_?.imgs && data_?.imgs?.length == 0) {
      data.images = [
        {
          ind: 0,
          url: "/img/storybg1.webp",
          // url: "https://firebasestorage.googleapis.com/v0/b/kenal-9d89a.appspot.com/o/placeholder%2Fstorybackground.jpg?alt=media&token=8d2c2f7e-91dd-43c5-b556-a4eaa6b6394b",
        },
      ];
    }

    toolPostAdder(data, data_?.imgs, "stories", () => {
      clear();
    });
  }

  async function removeStory(id, caller) {
    toolRemoveDoc("stories", id, caller);
    const comments = await toolGetDocs(
      "storyComments",
      where("storyId", "==", id)
    );

    if (comments && comments?.length > 0) {
      comments?.map((c) => {
        toolRemoveDoc("storyComments", c?.id);
      });
    }
  }

  async function addStoryComment(data_) {
    const data = {
      storyId: data_?.story?.id,
      storyUserId: data_?.story?.userId,
      userId: user?.uid,
      body: data_?.body,
    };
    await toolPostAdder(data, data_?.imgs, "storyComments");
  }

  function listenStoryComments({ storyId, blockedUsers }, caller) {
    const q = query(
      collection(db, "storyComments"),
      where("storyId", "==", storyId),
      where(
        "userId",
        "not-in",
        blockedUsers?.length != 0 ? blockedUsers : ["xxxxxxxxxxxxxxxxxxxx"]
      ),
      orderBy("userId", "asc"),
      orderBy("timestamp", "desc")
    );
    return onSnapshot(q, (snap) => {
      caller?.(snap?.docs?.map((d) => ({ ...d.data(), id: d.id })));
    });
  }

  async function storyCommentDelete(storyId) {
    return await toolRemoveDoc("storyComments", storyId);
  }

  async function storyCommentUpdate(prev, body, images, docId) {
    console.log(prev, body, images, docId);
    await toolUpdatedoc("storyComments", docId, { prev, body, images });
  }

  async function storyUpdate(
    prev,
    body,
    images,
    docId,
    privacy,
    caller,
    errorer
  ) {
    const data = { prev, body, images, privacy };
    return await toolUpdatedoc("stories", docId, data, caller, errorer);
  }

  async function checkStoryCommentPrivacy(comment) {
    let ret = true;
    const userId = comment?.userId;
    const userSettings = await getUserSettings(userId);
    const blockedUsers = userSettings?.blockedusers;
    if (blockedUsers?.find((u) => u == user?.uid)) {
      ret = false;
    }
    return ret;
  }

  function checkRelations(userId, privacy) {
    console.log("privacy", privacy);
    if (privacy == "Followers") {
      return isFollowing(userId, relations);
    } else if (privacy == "Public") {
      return true;
    } else {
      return false;
    }
  }

  async function checkStoryPrivacy({ userId, privacy }) {
    if (userId == user?.uid) return true;
    return checkRelations(userId, privacy);
  }

  async function checkStoryCommentAllowPrivacy(story) {
    if (story?.userId == user?.uid) return true;
    const userSettings = await getUserSettings(story?.userId);
    const visibility = userSettings?.commentStory;
    return checkRelations(story?.userId, visibility);
  }

  return {
    ...store,
    loadFirst,
    fetchNext,
    addStory,
    removeStory,
    addStoryComment,
    listenStoryComments,
    storyCommentDelete,
    storyCommentUpdate,
    storyUpdate,
    checkStoryPrivacy,
    checkStoryCommentPrivacy,
    checkStoryCommentAllowPrivacy,
  };
}
