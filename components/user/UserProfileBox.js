import React from "react";
import useUser from "../../controls/useUser";
import UserItem from "./UserItem";

const UserProfileBox = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="box hidden lg:block overflow-hidden max-h-[100px]">
        <h2 className="font-semibold text-lg text-slate-600 dark:text-slate-400">
          try to login
        </h2>
        <p className="text-sm text-slate-500">click on login menu above.</p>
      </div>
    );
  }
  return (
    <div className="relative box min-h-[65px] flex overflow-hidden">
      <span className="absolute ">
        <UserItem userId={user?.uid} nameClass="hidden lg:block" />
      </span>
    </div>
  );
};

export default UserProfileBox;
