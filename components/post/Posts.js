import usePost from "../../controls/usePost";
import PostItem from "./PostItem";

export default function Posts() {
  const { posts } = usePost();
  return (
    <div className="py-2">
      {posts?.map((post) => (
        <PostItem data={post} key={post?.id} />
      ))}
    </div>
  );
}



