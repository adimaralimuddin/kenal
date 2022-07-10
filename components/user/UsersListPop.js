import Droper from "../elements/Droper";
import UserItem from "../user/UserItem";

export default function UsersListPop({
  open,
  set,
  users,
  par,
  div,
  text = "users",
  show,
}) {
  if (!show) return null;

  if (users?.length <= 0) return null;

  return (
    <Droper
      open={open}
      set={set}
      par={"" + par}
      div={
        "min-w-[100px] bg-opacity-60 backdrop-blur-sm bg-gray-300 py-2 px-1 ring-gray-300 " +
        div
      }
    >
      <p className="text-center">{text}</p>
      <div>
        {users?.map((userId) => (
          <UserItem className="py-0" userId={userId} small="on" />
        ))}
      </div>
    </Droper>
  );
}
