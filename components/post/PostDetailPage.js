import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase.config";

export default function PostDetailPage({ postId }) {
  const [post, setPost] = useState(null);
  useEffect(() => {
    if (postId) {
      onSnapshot(doc(db, "posts", postId), (doc_) => {
        const postData = { ...doc_?.data(), id: doc_.id };
        setPost(postData);
      });
    }
  }, [postId]);

  return <div>{post?.body}</div>;
}
