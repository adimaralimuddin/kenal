import React from "react";
import useRelations from "../../../controls/useRelations";
import useUser from "../../../controls/useUser";
import UserItem from "../../user/UserItem";

const UserConfirmItem = ({ notif }) => {
  const { acceptFollowRequest, declineFollowRequest } = useRelations();
  return (
    <div className=" box flex flex-col gap-2 rounded-xl flex-1 max-h-[200px]">
      <header>
        <UserItem userId={notif?.from}>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            sent you friend request
          </p>
        </UserItem>
      </header>
      <section className="flex gap-2">
        <button
          onClick={() => acceptFollowRequest(notif.to, notif.from)}
          className="btn-prime flex-1"
        >
          Accept
        </button>
        <button
          onClick={() => declineFollowRequest(notif.to, notif.from)}
          className="btn-sec flex-1"
        >
          Decline
        </button>
      </section>
    </div>
  );
};

export default UserConfirmItem;
