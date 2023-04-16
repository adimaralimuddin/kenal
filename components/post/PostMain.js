import React from "react";
import MessagesAll from "../messages/messagesAll/MessagesAll";
import StoryMain from "../story/StoryMain";
import SuggestionMain from "../suggestions/SuggestionMain";
import UserConfirmLIsts from "../userRequest/userConfirmLists/UserConfirmLIsts";
import PostAdder from "./PostAdder";
import Posts from "./Posts";

const PostMain = () => {
  return (
    <div className="flex gap-4 ">
      <div className="w-full md:w-[70%] flex flex-col gap-4 ">
        <StoryMain />
        <PostAdder />
        <Posts />
      </div>
      <div className=" w-[35%] hidden md:flex flex-col gap-4 max-w-[290px] bg-whited rounded-xl dlg:min-w-[300px] dring-1">
        <UserConfirmLIsts />
        <MessagesAll showMenu={false} />
        <SuggestionMain />
      </div>
    </div>
  );
};

export default PostMain;
