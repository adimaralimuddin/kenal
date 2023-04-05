import React, { useState } from "react";
import ButtonPrim from "../../elements/ButtonPrim";
import Icon from "../../elements/Icon";
import GroupChatCreator from "./GroupChatCreator";

const GroupChatCreatorButton = ({ set }) => {
  return (
    <div className="flex gap-2 items-center">
      <ButtonPrim onClick={() => set(true)} icon="add">
        Create Group Chat
      </ButtonPrim>
    </div>
  );
};

export default GroupChatCreatorButton;
