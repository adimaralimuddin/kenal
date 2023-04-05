import Link from "next/link";
import { useEffect, useState } from "react";
import useSettings from "../../controls/useSettings";
import useUser from "../../controls/useUser";
import Avatar from "../elements/Avatar";
import FollowerBtn from "../relations/FollowerBtn";
import UserItem from "./UserItem";

export default function UserSugItem({ data: userData }) {
  const { userName, avatar } = userData;
  const { listenUserSettings, settings: authSettings } = useSettings();
  const [settings, setSettings] = useState(null);
  const { user } = useUser();

  // console.log("data ", userData);

  useEffect(() => {
    const ret = listenUserSettings(userData?.id, setSettings);
    return ret;
  }, [userData]);

  if (
    settings?.blockedusers?.find((p) => p == user?.uid) ||
    authSettings?.blockedusers?.find((p) => p == userData?.id)
  )
    return null;

  return (
    <div className="flex transition cursor-pointer rounded-md ring-gray-200  items-center text-gray-500 dark:hover:text-white">
      <UserItem userId={userData?.id} className="flex-1" />
      {/* <Avatar
        src={userData?.photoURL}
        size={35}
        userName={userData?.displayName}
      />
      <Link href={`user/${userData?.id}`}>
        <p className="mx-1 flex-1 text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300">
          {userData?.displayName}
        </p>
      </Link> */}
      <FollowerBtn toUser={userData} />
    </div>
  );
}
