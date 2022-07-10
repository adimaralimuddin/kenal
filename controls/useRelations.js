import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.config";
import { toolArrayUnion, toolArrayRemove } from "./toolArrayDb";
import toolGetDoc from "./toolGetDoc";
import useNotifs from "./useNotifs";

export default function useRelations() {
  const { addNotif } = useNotifs();
  function listen(relId, caller) {
    if (relId) {
      return onSnapshot(doc(db, "relations", relId), (doc_) => {
        caller(doc_?.data());
      });
    }
  }

  async function followUser(to, by) {
    const rel = await toolGetDoc("relations", to);

    if (rel?.followers?.find((x) => x == by)) {
      toolArrayRemove("relations", by, "followings", to);
      toolArrayRemove("relations", to, "followers", by);
      addNotif(to, by, "unfollow", to);
    } else {
      toolArrayUnion("relations", by, "followings", to);
      toolArrayUnion("relations", to, "followers", by);
      addNotif(to, by, "follow", to);
    }
  }

  return {
    listen,
    followUser,
  };
}
