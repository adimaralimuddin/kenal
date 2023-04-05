import React, { useEffect } from "react";
import useUsers from "../../controls/useUsers";
import Avatar from "../elements/Avatar";
import IconBtn from "../elements/IconBtn";

const UserLists = ({
  onDone,
  users,
  title,
  setUsers,
  onUserSelect,
  icon,
  className,
  filteredUsers,
}) => {
  const { getPeople } = useUsers();

  useEffect(() => {
    getPeople((users_) => {
      setUsers(users_);
    });
  }, []);

  const usersLists = users?.filter(
    (u) => !filteredUsers?.find((uid) => uid == u.id)
  );

  return (
    <div
      className={
        "flex-1 flex flex-col ring-1 p-2 rounded-lg ring-slate-200 dark:ring-slate-600 gap-2 " +
        className
      }
    >
      <header>
        <p className="px-2 text-sm font-medium">{title}</p>
      </header>
      <input placeholder="search user" className="w-full" />
      <div className="flex-1">
        {usersLists?.map((user) => (
          <FriendItem
            user={user}
            onSelect={onUserSelect}
            icon={icon}
            key={user.id}
          />
        ))}
      </div>
      <footer className="pt-2">
        {onDone && (
          <button onClick={() => onDone(true)} className="btn-prime">
            Done
          </button>
        )}
      </footer>
    </div>
  );
};
const FriendItem = ({ user, icon = "add", onSelect }) => {
  const onClickHandler = () => {
    onSelect(user);
  };
  return (
    <div className="flex items-center gap-3 justify-between">
      <div className="flex items-center gap-2">
        <Avatar src={user?.photoURL} size={20} />
        <p className="text-sm">{user?.displayName}</p>
      </div>
      <IconBtn onClick={onClickHandler}>{icon}</IconBtn>
    </div>
  );
};
export default UserLists;
