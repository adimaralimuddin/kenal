import { doc, onSnapshot } from "firebase/firestore";
import create from "zustand";
import { db } from "../firebase.config";
import { toolArrayRemove, toolArrayUnion } from "./toolArrayDb";
import toolGetDoc from "./toolGetDoc";
import useNotifs from "./useNotifs";
import useUser from "./useUser";

const store_ = create((set) => ({ set: (data) => set(data) }));

export default function useRelations() {
  const { notify, updateNotif } = useNotifs();
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
  async function acceptFollowRequest(by, to) {
    await toolArrayUnion("relations", to, "followings", by);
    await toolArrayUnion("relations", by, "followers", to);
    await toolArrayRemove("relations", by, "request", to);

    notify({
      to,
      from: by,
      docId: by,
      type: "profile",
      subtype: "accepted",
      notif: "follow",
    });
    updateNotif({
      notifId: "request" + to + by,
      data: { confirmed: true, seen: true },
    });
  }

  async function declineFollowRequest(by, to) {
    await toolArrayRemove("relations", by, "request", to);
    await toolArrayUnion("relations", by, "declined", to);
    notify({
      to,
      from: by,
      docId: by,
      type: "profile",
      subtype: "declined",
      notif: "follow",
    });
    updateNotif({
      notifId: "request" + to + by,
      data: { confirmed: true, seen: true, canceled: true },
    });
  }

  async function cancelRequest(userId) {
    await toolArrayRemove("relations", userId, "request", user.uid);
  }

  async function followUser(to, by) {
    const rel = await toolGetDoc("relations", to);

    if (rel?.followers?.find((x) => x == by)) {
      toolArrayRemove("relations", by, "followings", to);
      toolArrayRemove("relations", to, "followers", by);
      notify({
        to,
        from: by,
        docId: to,
        type: "profile",
        subtype: "unfollow",
        notif: "follow",
        confirmed: false,
        seen: false,
        canceled: false,
      });
    } else {
      await notify({
        to,
        from: user.uid,
        type: "relation",
        subtype: "sendrequest",
        notif: "follow",
        msg: "want's to follow you.",
        docId: to,
        id: "request" + user.uid + to,
        confirmed: false,
        seen: false,
        canceled: false,
      });
      toolArrayUnion("relations", to, "request", by);
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
  function isRequesting(relation = relations, userId) {
    if (relation?.request?.find((p) => p == user?.uid)) {
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
    acceptFollowRequest,
    cancelRequest,
    declineFollowRequest,
    isRequesting,
  };
}
