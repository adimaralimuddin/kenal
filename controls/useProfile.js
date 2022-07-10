
import useUser from "./useUser";
import create from "zustand";
import toolUpdatedoc from "./toolUpdateDoc";

const store_ = create((set) => ({
  set: (data) => set(data),
  data: {},
}));

export default function useProfile() {
  const { user } = useUser();
  const store = store_();
  const { set, data } = store;

  function update() {
    toolUpdatedoc("profile", user?.uid, { data });
  }

  return {
    ...store,
    update,
  };
}
