import ButtonPrim from "../elements/ButtonPrim";
import UserItem from "../user/UserItem";

export default function BlockUserItem({ val, action, text = "unblock" }) {
  return (
    <div className="flex flex-wrap items-center hover:bg-indigo-50 dark:hover:bg-slate-700 hover:ring-1d justify-between">
      <UserItem userId={val} pop={false} />
      <ButtonPrim onClick={() => action(val)} className="mx-2">
        {text}
      </ButtonPrim>
    </div>
  );
}
