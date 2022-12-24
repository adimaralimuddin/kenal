import toolPostAdder from "../controls/toolPostAdder";
import create from "zustand";
import useSettings from "./useSettings";
import useUser from "./useUser";
const store_ = create((set) => ({
  convers: [],
  minimized: [],
  opened: [],
  set: (data) => set(data),
}));

export default function useChat() {
  const store = store_();
  const { set } = store;
  const { getUserSettings, settings } = useSettings();
  const { user } = useUser();

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
      console.log(n);
      return { convers: n };
    });
  }

  async function addChat({ data, imgs }, clear) {
    const ret = await toolPostAdder(data, imgs, "chats");
    clear();
    return ret;
  }

  function removeConver(conver) {
    set((p) => ({
      convers: p.convers.filter((c) => c.conver != conver),
    }));
  }

  function closeConver(conver) {
    set((p) => ({
      convers: p.convers.map((c) => {
        if (c.id == conver.toString()) {
          c.open = false;
        }
        return c;
      }),
    }));
  }

  function minimizeConver(conver, action = true) {
    set((p) => ({
      convers: p.convers.map((c) => {
        if (c.id == conver?.toString()) {
          c.minimized = action;
        }
        return c;
      }),
    }));
  }

  async function checkChatPrivacy(conver) {
    let ret = true;
    const userId = conver?.filter((p) => p !== user?.uid)?.[0];
    const userSettings = await getUserSettings(userId);
    const blockedUsers = userSettings?.blockedusers;
    const myBlockedUsers = settings?.blockedusers;
    const blockedChats = userSettings?.blockedchats;

    console.log("chats blocked", blockedChats);

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
    addChat,
    closeConver,
    minimizeConver,
    removeConver,
    checkChatPrivacy,
  };
}
