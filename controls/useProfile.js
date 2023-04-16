import create from "zustand";
import toolUpdatedoc from "./toolUpdateDoc";
import useUser from "./useUser";

const store_ = create((set) => ({
  set: (data) => set(data),
  data: {},
}));

export default function useProfile() {
  const { user } = useUser();
  const store = store_();
  const { set, data } = store;

  async function update(profile) {
    const updatedData = { ...profile?.data, ...data };
    console.log("data", updatedData);
    await toolUpdatedoc("profile", user?.uid, { data: updatedData });
  }

  return {
    ...store,
    user,
    update,
  };
}
