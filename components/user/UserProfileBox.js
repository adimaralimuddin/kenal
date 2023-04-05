import React from "react";
import useUser from "../../controls/useUser";
import UserItem from "./UserItem";

const UserProfileBox = () => {
  const { user } = useUser();
  return (
    <div className="relative box min-h-[65px] flex overflow-hidden">
      <span className="absolute ">
        <UserItem userId={user?.uid} nameClass="hidden lg:block" />
      </span>
    </div>
  );
};

export default UserProfileBox;
