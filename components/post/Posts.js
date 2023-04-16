import { useEffect, useRef, useState } from "react";
import usePost from "../../controls/usePost";
import useSettings from "../../controls/useSettings";
import useUser from "../../controls/useUser";
import PostItem from "./PostItem";

export default function Posts() {
  const { user } = useUser();
  const { settings } = useSettings();
  const { posts, initPosts, loadMorePost, full } = usePost();
  const ref1 = useRef(null);

  const isBottomScreen = useOnScreen(ref1);

  useEffect(() => {
    let ret;
    if (isBottomScreen) {
      ret = setTimeout(() => {
        loadMorePost();
      }, 500);
    }
    return () => clearTimeout(ret);
  }, [isBottomScreen]);

  useEffect(() => {
    if (!user) return;
    const ret = initPosts();
    return ret;
  }, [user, settings]);

  const totalPosts = posts?.sort(
    (a, b) => b?.timestamp?.toDate() - a?.timestamp?.toDate()
  );

  return (
    <div className="flex flex-col gap-4">
      {totalPosts?.map((post) => (
        <PostItem data={post} key={post?.id} />
      ))}
      <div className="flex items-center justify-center gap-2 text-xl text-center py-3 text-slate-400 dark:text-slate-500">
        <h1 ref={ref1}>{!full && "loading posts . . ."}</h1>
        {full && <h1 className="text-center">no more post</h1>}
      </div>
    </div>
  );
}

function useOnScreen(ref, rootMargin = "5px") {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      }
    );
    if (ref.current) {
      observer?.observe(ref.current);
    }
    return () => {
      if (ref?.current) {
        observer?.unobserve(ref.current);
      }
    };
  }, []);
  return isIntersecting;
}
