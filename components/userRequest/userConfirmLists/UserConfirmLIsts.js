import React from "react";
import UserConfirmItem from "../userConfirmItem/UserConfirmItem";

const test = [1, 2];
const UserConfirmLIsts = () => {
  return (
    <div className="flex flex-col gap-3 ">
      {test?.map((i) => (
        <UserConfirmItem key={i} />
      ))}
    </div>
  );
};

export default UserConfirmLIsts;
