import { useEffect } from "react";
import useRelations from "../../controls/useRelations";
import useSettings from "../../controls/useSettings";
import useUser from "../../controls/useUser";
import PostAdder from "../post/PostAdder";
import Posts from "../post/Posts";
import StoryMain from "../story/StoryMain";
import SuggestionMain from "../suggestions/SuggestionMain";
import VideoTest from "../VideoTest";

export default function MainContent() {
  const { listen } = useSettings();
  const { initRelation, relations } = useRelations();
  const { user } = useUser();
  useEffect(() => {
    if (!user) return;
    listen();
    initRelation();
  }, [user]);
  return (
    <div className="flex max-w-5xld mx-auto justify-center m-2 flex-wrap gap-3 ">
      <div className="flex-1 px-[10px] max-w-lg ">
        <StoryMain />
        <PostAdder />
        <Posts />
      </div>
      <div className="pl-4 flex-1 max-w-xs hidden md:block">
        <SuggestionMain />
      </div>
    </div>
  );
}
