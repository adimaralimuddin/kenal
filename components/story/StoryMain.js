import { useEffect, useState } from "react";
import useSettings from "../../controls/useSettings";
import useStory from "../../controls/useStory";
import useUser from "../../controls/useUser";
import { useAlert } from "../elements/Alert";
import Icon from "../elements/Icon";
import IconBtn from "../elements/IconBtn";
import Modal from "../elements/Modal";
import LikeMain from "../reactions/LikeMain";
import StoryAdder from "./StoryAdder";
import StoryComments from "./StoryComments";
import StoryItem from "./StoryItem";
import StoryItemViewer from "./StoryItemViewer";

export default function StoryMain() {
  const { loadFirst, stories, fetchNext } = useStory();
  const { user } = useUser();
  const [ind, setInd] = useState(0);
  const [open, setOpen] = useState(false);
  const story = () => stories?.[ind];
  const { settings } = useSettings();
  const { open: openAlert } = useAlert();

  useEffect(() => {
    loadFirst();
  }, [settings, user]);

  const forward = () => {
    if (ind >= stories?.length - 1) {
      fetchNext((n) => {
        if (n?.length == 0) {
          setInd(stories?.length);
        } else {
          setInd((p) => p + 1);
        }
      });
    } else {
      setInd((p) => p + 1);
    }
  };
  const prev = () => {
    setInd((p) => (p <= 0 ? 0 : p - 1));
  };

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
    <div className="flex flex-1  min-h-[180px] ">
      <StoryVisible
        ind={ind}
        onItemOpenHandler={onItemOpenHandler}
        seeMorehandler={seeMorehandler}
      />
      <Modal
        open={open}
        set={setOpen}
        className=" p-0 py-0 max-h-[100vh] overflow-x-hidden overflow-y-auto"
        div="flex-1 content-centerd items-centerd flex flex-wrap max-h-[90vh] w-[100%] justify-center mx-5 px-5  "
      >
        <div className="flex ring- flex-col flex-1  max-w-lg min-w-[300px]  min-h-[80vh] px- px-4">
          <div className=" flex flex-1 items-center pb-3 ">
            <LeftButton ind={ind} prev={prev} />
            <div className=" flex flex-col items-center justify-center flex-1 self-stretch">
              <StoryItemViewer
                openPar={open}
                setOpenPar={setOpen}
                total={stories?.length}
                ind={ind}
                story={story}
                forward={forward}
              />
            </div>
            <RightButton ind={ind} forward={forward} stories={stories} />
          </div>
          {stories?.length != ind && (
            <LikeMain
              col_="stories"
              data={story()}
              className="ml-[5%] mb-2 text-white min-h-[30px] "
              likeActiveStyle=" text-white bg-indigo-300 p-1 text-white dark:text-white"
              loveActiveStyle="text-white bg-pink-300 p-1 pt-2 dark:text-white "
              likeClass="text-white hover:animation-bounce"
              loveClass="text-white hover:animation-bounce"
            />
          )}
        </div>
        <StoryComments story={story} ind={ind} total={stories?.length} />
      </Modal>
    </div>
  );
}

function StoryVisible({ ind = 0, onItemOpenHandler, seeMorehandler }) {
  const { stories, removeStory } = useStory();
  return (
    <>
      <div className="flex-1  flex overflow-x-auto gap-3  ">
        <StoryAdder />
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
        <div className="to-[50] -right-3 flex absolute h-full items-center">
          <Icon
            onClick={seeMorehandler}
            className={
              "hover:scale-125 transition shadow-md cursor-pointer text-white bg-gradient-to-r  bg-primary-light dark:bg-pink-400  hover:bg-pink-400 dark:hover:bg-pink-500 ring-[3px] ring-white p-2 rounded-full text-2xl w-[43px] h-[43px] text-center dark:text-white"
            }
          >
            arrow-right
          </Icon>
        </div>
      </span>
    </>
  );
}

function LeftButton({ ind, prev }) {
  return (
    <span className="relative">
      <div className="absolute  -left-4 z-10 text-3xl ">
        <IconBtn
          className={ind <= 0 && " opacity-50  cursor-not-allowed"}
          onClick={prev}
        >
          arrow-left
        </IconBtn>
      </div>
    </span>
  );
}

function RightButton({ ind, forward, stories }) {
  return (
    <span className="relative">
      <div
        disabled={ind == stories?.length}
        className="absolute  -right-3 z-10 text-3xl"
      >
        <IconBtn
          className={
            ind == stories?.length && "  opacity-50  cursor-not-allowed"
          }
          onClick={forward}
        >
          arrow-right
        </IconBtn>
      </div>
    </span>
  );
}
