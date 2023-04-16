import useSettings from "../../useSettings";
import useUser from "../../useUser";
import UseMiniChatStore from "./useMiniChatStore";

export default function useChat() {
  const store = UseMiniChatStore();
  const { set } = store;
  const { getUserSettings, settings } = useSettings();
  const { user } = useUser();

  function openMiniConverse(converse) {
    set((p) => {
      let n = p?.convers?.filter((c) => c?.id != converse?.id);
      n.splice(0, 0, {
        converse,
        conver: converse?.members,
        open: true,
        prior: true,
        minimized: false,
        id: converse?.id,
      });
      return { convers: n };
    });
  }

  function openConver(conver) {
    set((p) => {
      let n = p?.convers?.filter((c) => c?.id != conver?.toString());
      n.splice(0, 0, {
        conver,
        open: true,
        prior: true,
        minimized: false,
        id: conver.toString(),
      });
      return { convers: n };
    });
  }

  function removeConver(converse) {
    set((p) => ({
      [converse?.id]: [],
      convers: p.convers.filter((c) => c.id != converse?.id),
    }));
  }

  function closeConver(converse) {
    set((p) => ({
      convers: p.convers.map((c) => {
        if (c.id == converse.id) {
          c.open = false;
        }
        return c;
      }),
    }));
  }

  function minimizeConver(converse, action = true) {
    set((p) => ({
      convers: p.convers.map((c) => {
        if (c.id == converse?.id) {
          c.minimized = action;
        }
        return c;
      }),
    }));
  }

  async function checkChatPrivacy(conver) {
    let ret = true;
    const userId = conver?.filter((p) => p !== user?.uid)?.[0];
    if (!userId) return true;
    const userSettings = await getUserSettings(userId);
    const blockedUsers = userSettings?.blockedusers;
    const myBlockedUsers = settings?.blockedusers;
    const blockedChats = userSettings?.blockedchats;

    if (blockedUsers?.find((p) => p == user?.uid)) {
      ret = false;
    }
    if (myBlockedUsers?.find((p) => p == userId)) {
      ret = false;
    }
    if (blockedChats?.find((p) => p == userId)) {
      ret = false;
    }
    return ret;
  }

  return {
    ...store,
    openConver,
    closeConver,
    minimizeConver,
    removeConver,
    checkChatPrivacy,
    openMiniConverse,
  };
}
