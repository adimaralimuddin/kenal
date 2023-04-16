import {
  collection,
  documentId,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import useRelations from "../../controls/useRelations";
import useSettings from "../../controls/useSettings";
import useUser from "../../controls/useUser";
import { db } from "../../firebase.config";
import UserSugItem from "../user/UserSugItem";

export default function SuggestionMain() {
  const { user } = useUser();
  const { settings } = useSettings();
  const x = useRelations();
  const [users, setUsers] = useState([]);
  // console.log("relations", x);

  useEffect(() => {
    const blockedUsers = settings?.blockedusers;
    if (!user || !blockedUsers) return;
    const filteredUsers =
      blockedUsers?.length != 0 ? [...blockedUsers, user.uid] : [user.uid];
    const q = query(
      collection(db, "profile"),
      where(documentId(), "not-in", filteredUsers)
    );
    const ret = onSnapshot(q, (snap) => {
      const users = snap?.docs?.map((d) => ({ id: d?.id, ...d?.data() }));
      setUsers(users);
    });

    return ret;
  }, [user, settings]);

  if (!user) {
    return null;
  }
  return (
    <div className=" box">
      {users?.length != 0 && (
        <h2 className="px-2 pb-3 pt-1 text-h2 font-semibold   text-slate-600 dark:text-slate-300">
          Suggested For You
        </h2>
      )}
      <div className="flex-col flex gap-2 pt-2">
        {users?.map((user_) => (
          <UserSugItem data={user_} key={user_?.id} />
        ))}
      </div>
    </div>
  );
}
