import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase.config";
import PostItem from "./PostItem";
import PostAdder from "./PostAdder";

export default function UserPosts({ userId, setLength, authId }) {
  const [posts, setPosts] = useState();

  useEffect(() => {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    onSnapshot(q, (snap) => {
      const posts = snap?.docs?.map((d) => ({ ...d?.data(), id: d?.id }));
      setPosts(posts);
      setLength(posts?.length);
    });
  }, [userId]);

  return (
    <div className="flex-1 px-2 ">
      {authId == userId && <PostAdder className="" />}
      {posts?.map((p) => (
        <PostItem data={p} key={p?.id} />
      ))}
    </div>
  );
}
