import React, { useEffect } from "react";
import UseMessages from "../../../controls/chats/messages/useMessages";
import useUsers from "../../../controls/useUsers";
import UserLists from "../../user/UserLists";

const ConverMemberAdder = ({ set, friends }) => {
  const { getFriends } = useUsers();
  const { addMember, converseSnap } = UseMessages();
  useEffect(() => {
    getFriends((friends) => {
      set({ friends });
    });
  }, []);

  const onUserSelectHandler = (user) => {
    addMember({ memberId: user.id });
  };

  const filteredUsers = [
    ...(converseSnap?.members || []),
    ...(converseSnap?.requestedMembers || []),
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
