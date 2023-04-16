import { useEffect, useState } from "react";
import useSettings from "../../controls/useSettings";
import useStory from "../../controls/useStory";
import useUser from "../../controls/useUser";
import { useAlert } from "../elements/Alert";
import Icon from "../elements/Icon";
import StoryAdder from "./StoryAdder";
import StoryItem from "./StoryItem";
import StoryViewer from "./StoryViewer";

export default function StoryMain() {
  const { loadFirst, stories } = useStory();
  const { user } = useUser();
  const [ind, setInd] = useState(0);
  const [open, setOpen] = useState(false);
  const story = () => stories?.[ind];
  const { settings } = useSettings();
  const { open: openAlert } = useAlert();

  useEffect(() => {
    loadFirst();
  }, [settings, user]);

  function onItemOpenHandler(ind) {
    setOpen(true);
    setInd(ind);
  }

  function seeMorehandler() {
    if (stories?.length == 0 || !stories || !stories?.length) {
      openAlert(
        "there are no stories yet. try to add your first story by clicking the add story button."
      );
      return;
    }
    setOpen(true);
    setInd(0);
  }

  return (
    <div className="flex flex-1  min-h-[180px]  max-h-[180px] ">
      <StoryVisible
        ind={ind}
        onItemOpenHandler={onItemOpenHandler}
        seeMorehandler={seeMorehandler}
      />
      <StoryViewer
        ind={ind}
        setInd={setInd}
        open={open}
        setOpen={setOpen}
        settings={settings}
        story={story}
      />
    </div>
  );
}

function StoryVisible({ ind = 0, onItemOpenHandler, seeMorehandler }) {
  const { stories, removeStory } = useStory();
  const { user } = useUser();

  return (
    <div className="flex-1 flex relative justify-end">
      <div className="flex-1 w-full h-full absolute  flex overflow-x-auto gap-3">
        {user && <StoryAdder />}
        {stories?.map((story, ind) => (
          <StoryItem
            data={story}
            ind={ind}
            onRemove={removeStory}
            key={story?.id}
            onOpen={onItemOpenHandler}
          />
        ))}
      </div>

      <span className="relative z-10">
        <div className="to-[50] -right-1 flex absolute h-full items-center">
          <Icon
            onClick={seeMorehandler}
            className={
              "min-w-[44px] h-[43px]  hover:scale-125 transition shadow-md cursor-pointer text-white bg-gradient-to-r  bg-primary-light dark:bg-pink-400  hover:bg-pink-400 dark:hover:bg-pink-500 ring-[3px] ring-white p-2 rounded-full text-2xl  text-center dark:text-white"
            }
          >
            arrow-right
          </Icon>
        </div>
      </span>
    </div>
  );
}
