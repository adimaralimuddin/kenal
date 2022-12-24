import React from "react";
import useUser from "../../controls/useUser";
import Avatar from "../elements/Avatar";

export default function UserDemo() {
  const { LoginWIthEmail } = useUser();
  const users = [
    ["mark@site.com", "user123"],
    ["bob@site.com", "user123"],
    ["peter@site.com", "user123"],
  ];

  const onSelectHandler = (user) => {
    const [email, password] = user;
    LoginWIthEmail(email, password, () => {
      location.replace("/feed");
    });
  };

  return (
    <div className="bt-1 border-t-2 border-slate-200 dark:border-d5 pt-1 mt-1">
      <h1 className="text-center text-lg font-semibold text-slate-600 dark:text-indigo-300 pb-1 ">
        use demo users
      </h1>
      {users?.map((user) => (
        <div
          key={user?.[0]}
          onClick={() => onSelectHandler(user)}
          className="flex gap-3 items-center  
          hover:bg-slate-200
          dark:hover:bg-d3 p-1 rounded-md cursor-pointer text-slate-500"
        >
          <Avatar userName={user?.[0]} size={30} />
          <h3>{user?.[0]}</h3>
        </div>
      ))}
    </div>
  );
}
