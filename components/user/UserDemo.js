import React from "react";
import useUser from "../../controls/useUser";
import Avatar from "../elements/Avatar";
import UserItem from "./UserItem";

export default function UserDemo() {
  const { LoginWIthEmail } = useUser();
  const users = [
    ["sutrajaya@kenal.com", "user123", "z20TxKAtsdZCz4veTngi2ZkR0IE3"],
    ["mike@kenal.com", "user123", "tbu15ORsTmXctCiKgIMf0kgKQh02"],
    ["wakami@kenal.com", "user123", "EeDpBm9vVWQvyhKZVfevcfcAmE33"],
    ["ahmed@kenal.com", "user123", "sS0w4WJQo4aa3clNH1rZYzOrzjm2"],
  ];

  const onSelectHandler = (user) => {
    const [email, password] = user;
    LoginWIthEmail(email, password, () => {
      location.replace("/feed");
    });
  };

  return (
    <div className="bt-1 border-t-2 border-slate-200 dark:border-d5 pt-1 my-2">
      <h1 className="text-center text-base font-semibold text-slate-700 dark:text-indigo-300 pb-1 ">
        Use Demo Users
      </h1>
      {users?.map((user) => (
        <div
          key={user?.[0]}
          onClick={(e) => {
            e.stopPropagation();
            onSelectHandler(user);
          }}
          className="flex gap-1 items-center  
          hover:bg-slate-100
          dark:hover:bg-d3 p-1 rounded-md cursor-pointer text-slate-500"
        >
          <UserItem userId={user[2]} pop={false} />
        </div>
      ))}
    </div>
  );
}
