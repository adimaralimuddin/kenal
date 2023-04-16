import create from "zustand";

const useMessageStore = create((set) => ({ set, isConverPanelOpen: false }));

export default useMessageStore;
