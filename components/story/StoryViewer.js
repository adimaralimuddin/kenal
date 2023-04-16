import { useEffect } from "react";
import useStory from "../../controls/useStory";
import useUser from "../../controls/useUser";
import IconBtn from "../elements/IconBtn";
import Modal from "../elements/Modal";
import LikeMain from "../reactions/LikeMain";
import StoryComments from "./StoryComments";
import StoryItemViewer from "./StoryItemViewer";

export default function StoryViewer({
  open,
  setOpen,
  story,
  ind,
  setInd,
  settings,
}) {
  const { loadFirst, stories, fetchNext } = useStory();
  const { user } = useUser();

  //   useEffect(() => {
  //     loadFirst();
  //   }, [settings, user]);

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

  return (
    <Modal
      open={open}
      set={setOpen}
      className=" p-0 py-0 max-h-[100vh] overflow-x-hidden overflow-y-auto"
      div=" max-w-5xl max-h-[90vh] h-full "
    >
      <div className="flex flex-1 gap-2">
        <div className="flex  relative  flex-col flex-1  max-w-lg min-w-[300px]  min-h-[80vh] px- px-4">
          <div className=" flex flex-1 items-center ">
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
          <div className="absolute bottom-0 left-0 px-3">
            {stories?.length != ind && (
              <LikeMain
                col_="stories"
                postId={story()?.id}
                data={story()}
                className="ml-[5%] mb-2 text-white min-h-[30px] "
                likeActiveStyle=" text-white bg-indigo-300 p-1 text-white dark:text-white"
                loveActiveStyle="text-white bg-pink-300 p-1 pt-2 dark:text-white "
                likeClass="text-white hover:animation-bounce"
                loveClass="text-white hover:animation-bounce"
              />
            )}
          </div>
        </div>
        <StoryComments story={story} ind={ind} total={stories?.length} />
      </div>
    </Modal>
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
