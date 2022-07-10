import Link from "next/link";
import Avatar from "../elements/Avatar";

export default function UserSugItem({ data }) {
  const { userName, avatar } = data;

  return (
    <Link href={`user/${data?.id}`}>
      <div className="flex cursor-pointer hover:ring-1 rounded-md ring-gray-200 items-center text-gray-500">
        <Avatar src={avatar} size={35} />
        <p className="mx-1">{userName}</p>
      </div>
    </Link>
  );
}
