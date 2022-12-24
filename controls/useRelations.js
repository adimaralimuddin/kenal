import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.config";
import { toolArrayUnion, toolArrayRemove } from "./toolArrayDb";
import toolGetDoc from "./toolGetDoc";
import useNotifs from "./useNotifs";
import create from "zustand";
import useUser from "./useUser";

const store_ = create((set) => ({ set: (data) => set(data) }));

export default function useRelations() {
  const { addNotif } = useNotifs();
  const store = store_();
  const { set, relations } = store;
  const { user } = useUser();
  function listen(relId, caller) {
    if (relId) {
      return onSnapshot(doc(db, "relations", relId), (doc_) => {
        caller?.(doc_?.data());
      });
    }
  }

  function initRelation() {
    return onSnapshot(doc(db, "relations", user?.uid), (doc_) => {
      set({ relations: { ...doc_?.data(), id: doc_?.id } });
    });
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

  function isFollowers(relation, a, b) {
    if (relation?.followers?.find((p) => p == user?.uid)) {
      a?.();
    } else {
      b?.();
    }
  }
  function isFollowings(relation = relations, userId) {
    if (relation?.followings?.find((p) => p == userId)) {
      return true;
    } else {
      return false;
    }
  }

  function checkRelationPrivacy(userId, relation, userSettings) {
    switch (userSettings?.seeFollowedPeople) {
      case "Followers":
        isFollowers(
          relation,
          () => set({ showFollowings: true }),
          () => set({ showFollowings: false })
        );
        break;
      case "Public":
        set({ showFollowings: true });
        break;
      case "Only_me":
        set({ showFollowings: false });
        break;

      default:
        break;
    }

    switch (userSettings?.seeFollowers) {
      case "Followers":
        isFollowers(
          relation,
          () => set({ showFollowers: true }),
          () => set({ showFollowers: false })
        );
        break;
      case "Public":
        set({ showFollowers: true });
        break;
      case "Only_me":
        set({ showFollowers: false });
        break;
    }

    switch (userSettings?.postToProfile) {
      case "Followers":
        isFollowers(
          relation,
          () => set({ canPostToOther: true }),
          () => set({ canPostToOther: false })
        );
        break;
      case "Public":
        set({ canPostToOther: true });
        break;
      case "Only_me":
        set({ canPostToOther: false });
        break;
    }
  }

  function checkChatPrivacy(userId, relation, userSettings) {
    
    if (userSettings?.blockedchats?.find((p) => p == user?.uid)) {
      return false;
    }

    switch (userSettings?.canChat) {
      case "Public":
        return true;
      case "Followers":
        return relation?.followers?.find((p) => p == user?.uid);
      default:
        return false;
    }
  }

  function checkBlockUser(userSettings) {
    return userSettings?.blockedusers?.find((p) => p == user?.uid);
  }

  return {
    ...store,
    listen,
    followUser,
    initRelation,
    checkRelationPrivacy,
    isFollowings,
    checkChatPrivacy,
    checkBlockUser,
  };
}
