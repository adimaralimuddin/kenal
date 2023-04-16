import React from "react";

const ChatsSideBar = () => {
  return (
    <div className="box">
      <div>
        <h2 className="text-h2 text-md font-medium px-2">messages</h2>
        <input type="text" placeholder="search messages" />
      </div>
    </div>
  );
};

export default ChatsSideBar;
