import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import create from "zustand";
import { db } from "../firebase.config";
import toolGetDocs from "./toolGetDocs";
import toolPostAdder from "./toolPostAdder";
import toolRemoveDoc from "./toolRemoveDoc";
import toolRemoveFile from "./toolRemoveFile";
import toolUpdatedoc from "./toolUpdateDoc";
import useUser from "./useUser";
const store_ = create((set) => ({
  set: (data) => set(data),
}));

export default function usePost() {
  const store = store_();
  const { set, body, imgs, hookComments } = store;
  const { user } = useUser();

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    onSnapshot(q, (snap) => {
      set({ posts: snap?.docs?.map((d) => ({ ...d?.data(), id: d?.id })) });
      console.log("update post");
    });
  }, []);

  async function addPost() {
    set({ loading: true });

    const data = {
      status: "public",
      body,
      userId: user?.uid,
      edited: false,
    };

    toolPostAdder(data, imgs, "posts", () => {
      if ((ind) => imgs?.length) {
        set({ imgs: null, body: "" });
        set({ loading: false });
      }
    });

    set({ body: "", loading: false });
  }

  async function removePost(id, imgs) {
    toolRemoveDoc("posts", id);
    if (imgs) {
      imgs?.map((img) => {
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
  }

  async function updatePost(prev, body, images, docId) {
    await toolUpdatedoc("posts", docId, { prev, body, images });
  }

  return {
    ...store,
    addPost,
    removePost,
    updatePost,
  };
}






