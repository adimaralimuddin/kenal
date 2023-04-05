import React, { useEffect } from "react";
import UseMessages from "../../../controls/chats/useMessages";
import useUsers from "../../../controls/useUsers";
import UserLists from "../../user/UserLists";

const ConverMemberAdder = ({ set, friends }) => {
  const { getFriends } = useUsers();
  const { addMember, selectedConverse } = UseMessages();
  useEffect(() => {
    getFriends((friends) => {
      set({ friends });
    });
  }, []);

  const onUserSelectHandler = (user) => {
    addMember({ memberId: user.id });
  };

  const filteredUsers = [
    ...(selectedConverse?.members || []),
    ...(selectedConverse?.requestedMembers || []),
  ];

  return (
    <UserLists
      filteredUsers={filteredUsers}
      onDone={() => set({ isAddingMember: false })}
      title={"Adding Member To Group"}
      setUsers={(friends) => set({ friends })}
      onUserSelect={onUserSelectHandler}
      users={friends}
    />
  );
};

export default ConverMemberAdder;
