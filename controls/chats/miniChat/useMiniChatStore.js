import create from "zustand";

const UseMiniChatStore = create((set) => ({
  convers: [],
  minimized: [],
  opened: [],
  converse: [],
  set,
}));
export default UseMiniChatStore;
