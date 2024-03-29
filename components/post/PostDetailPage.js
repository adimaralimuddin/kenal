import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase.config";
import Postitem from "../post/PostItem";
import MainLayout from "../main/MainLayout";

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
  return (
    <MainLayout>
      {post && (
        <div className="px-2 max-w-xl mx-auto">
          <Postitem data={post} />
        </div>
      )}
      {!post && (
        <div>
          <h1>This post does not exist!</h1>
        </div>
      )}
    </MainLayout>
  );
}
