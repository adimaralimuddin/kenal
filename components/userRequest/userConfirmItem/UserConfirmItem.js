import React from "react";
import UserItem from "../../user/UserItem";

const UserConfirmItem = () => {
  return (
    <div className=" box flex flex-col gap-2 rounded-xl flex-1 max-h-[200px]">
      <header>
        <UserItem />
      </header>
      <section className="flex gap-2">
        <button className="btn-prime flex-1">Accept</button>
        <button className="btn-sec flex-1">Decline</button>
      </section>
    </div>
  );
};

export default UserConfirmItem;
