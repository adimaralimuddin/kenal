import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase.config";
import PostItem from "./PostItem";
import PostAdder from "./PostAdder";
import useSettings from "../../controls/useSettings";

export default function UserPosts({
  userId,
  setLength,
  canPost,
  authId,
  className,
}) {
  const [posts, setPosts] = useState();
  const { settings } = useSettings();

  useEffect(() => {
    // if (!userId || !authId) return;
    const q = query(
      collection(db, "posts"),
      where("userId", "array-contains-any", [userId])
    );
    onSnapshot(q, (snap) => {
      const posts = snap?.docs?.map((d) => ({ ...d?.data(), id: d?.id }));
      setPosts(posts);
      setLength(posts?.length);
    });
  }, [userId, authId, settings]);

  return (
    <div className={"flex-1 px-2 " + className}>
      {(canPost || authId == userId) && <PostAdder to={userId} />}
      {posts?.map((p) => (
        <PostItem data={p} key={p?.id} />
      ))}
    </div>
  );
}
