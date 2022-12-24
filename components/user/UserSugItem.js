import Link from "next/link";
import { useEffect, useState } from "react";
import useSettings from "../../controls/useSettings";
import useUser from "../../controls/useUser";
import Avatar from "../elements/Avatar";

export default function UserSugItem({ data }) {
  const { userName, avatar } = data;
  const { listenUserSettings, settings: authSettings } = useSettings();
  const [settings, setSettings] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    const ret = listenUserSettings(data?.id, setSettings);
    return ret;
  }, [data]);

  if (
    settings?.blockedusers?.find((p) => p == user?.uid) ||
    authSettings?.blockedusers?.find((p) => p == data?.id)
  )
    return null;

  return (
    <Link href={`user/${data?.id}`}>
      <div className="flex hover:scale-105 transition cursor-pointer rounded-md ring-gray-200  items-center text-gray-500 dark:hover:text-white">
        <Avatar src={avatar} size={35} userName={data?.userName} />
        <p className="mx-1 text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300">
          {userName}
        </p>
      </div>
    </Link>
  );
}
