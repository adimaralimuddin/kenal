import {
  collection,
  documentId,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import useSettings from "../../controls/useSettings";
import useUser from "../../controls/useUser";
import { db } from "../../firebase.config";
import UserSugItem from "../user/UserSugItem";

export default function SuggestionMain() {
  const { user } = useUser();
  const { settings } = useSettings();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const blockedUsers = settings?.blockedusers;
    if (!user || !blockedUsers) return;

    const q = query(
      collection(db, "users"),
      where(
        documentId(),
        "not-in",
        blockedUsers?.length != 0 ? blockedUsers : ["sfsd"]
      )
    );
    const ret = onSnapshot(q, (snap) => {
      const users = snap?.docs?.map((d) => ({ id: d?.id, ...d?.data() }));
      setUsers(users);
    });

    return ret;
  }, [user, settings]);

  return (
    <div className="py-5">
      {users?.length != 0 && (
        <h2 className="py-2 text-slate-400 font-semibold">
          People You May Know
        </h2>
      )}
      <div className="flex-col flex gap-2">
        {users?.map((user_) => (
          <UserSugItem data={user_} key={user_?.id} />
        ))}
      </div>
    </div>
  );
}
