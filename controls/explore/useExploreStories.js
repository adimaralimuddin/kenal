import create from "zustand";
import UseStoryListeners from "../stories/useStoryListeners";

export const ExploreStoriesStore = create((set) => ({ set }));

const useExploreStories = () => {
  const store = ExploreStoriesStore();
  const { listenStoryItem: listenItem } = UseStoryListeners();
  function listenStoryItem(storyId, caller) {
    const ret = listenItem({ storyId }, (storyItemSnap) => {
      store.set({ storyItem: storyItemSnap });
      caller && caller(storyItemSnap);
    });
    return ret;
  }
  return { ...store, listenStoryItem };
};

export default useExploreStories;
