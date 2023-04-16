import React from "react";
import create from "zustand";
import Box from "./Box";
import Icon from "./Icon";
import Modal from "./Modal";

const store_ = create((set) => ({
  state: false,
  loader: false,
  loaderIcon: "loader-5",
  text: "loading . . . ",
  icon: null,
  open: (text, loader = false, icon) =>
    set((p) => ({
      loader,
      state: true,
      text: text || p?.text || "",
      icon: icon || p?.icon || "",
    })),
  close: () => set({ state: false }),
  toggle: () =>
    set((p) => {
      return { state: !p?.state };
    }),
  set: (data) => set(data),
  setText: (text) => set({ text }),
}));

export function useAlert() {
  const store = store_();
  const { open, close, set } = store;

  const pop = (text, icon, t = 1, caller) => {
    set({
      state: true,
      text,
      loader: false,
      icon,
    });
    let c;
    c = setTimeout(() => {
      set({ state: false, icon: undefined });
      clearTimeout(c);
      caller?.(text);
    }, t * 1000);
  };

  return {
    ...store,
    pop,
  };
}

export default function Alert() {
  const { state, text, loader, toggle, loaderIcon, icon } = store_();

  return (
    <Modal
      open={state}
      set={toggle}
      div="z-[200]"
      className="bg-opacity-27 backdrop-blur-sm z-[999]"
    >
      <Box className="animate-pop duration-1000 transition-all text-slate-500 gap-2 flex flex-col items-center justify-center text-center min-h-[100px] min-w-[150px] font-semibold p-6 z-[999] max-w-mdd">
        {text}
        {loader && (
          <Icon className="animate-spin text-[2rem] font-bold text-purple-400 dark:text-purple-400">
            {loaderIcon}
          </Icon>
        )}
        {icon && (
          <Icon className="animate-spidn text-[2rem] font-bold text-purple-400 dark:text-purple-400">
            {icon}
          </Icon>
        )}
      </Box>
    </Modal>
  );
}
