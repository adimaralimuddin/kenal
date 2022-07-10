import Image from "next/image";
import { useEffect, useState } from "react";
import useStory from "../../controls/useStory";
import Icon from "../elements/Icon";
import IconBtn from "../elements/IconBtn";
import Modal from "../elements/Modal";
import Writer from "../elements/Writer";
import UserItem from "../user/UserItem";
import StoryAdder from "./StoryAdder";
import StoryItem from "./StoryItem";

export default function StoryMain() {
  const { stories, removeStory } = useStory();
  const [ind, setInd] = useState(0);
  const [open, setOpen] = useState(false);
  const story = () => stories?.[ind];

  useEffect(() => {
    setInd(0);
  }, [open]);

  const forward = () => setInd((p) => (p >= stories?.length ? p : p + 1));
  const prev = () => setInd((p) => (p <= 0 ? 0 : p - 1));

  return (
    <div className="flex py-2 max-h-[190px] min-h-[190px] ">
      <div className="flex-1 flex overflow-x-auto py-2">
        <StoryAdder />
        {stories?.map((story) => (
          <StoryItem data={story} onRemove={removeStory} key={story?.id} />
        ))}
      </div>
      <span className="relative z-10">
        <div className="to-[50] -left-7 flex absolute h-full items-center">
          <Icon
            onClick={(_) => setOpen(true)}
            className={
              "shadow-md cursor-pointer text-gray-600d text-white bg-pink-300 hover:bg-pink-400 ring-[3px] ring-white p-2 rounded-full text-2xl w-[50px] h-[50px] text-center "
            }
          >
            arrow-right
          </Icon>
        </div>
      </span>
      <Modal
        open={open}
        set={setOpen}
        par=""
        div="flex-1 max-h-[90vh] w-full max-w-lg items-center flex mx-4 px-5"
      >
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
        <div className=" flex flex-col items-center justify-center flex-1 self-stretch px-3">
          <StoryItemViewer
            total={stories?.length}
            ind={ind}
            story={story}
            forward={forward}
          />
          <div>
            <Writer />
          </div>
        </div>
        <span className="relative">
          <div className="absolute  -right-4 z-10 text-3xl">
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
      </Modal>
    </div>
  );
}

function StoryItemViewer({ total, ind, story, forward }) {
  const [imgInd, setImgInd] = useState(0);
  const [play, setPlay] = useState(true);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    setImgInd(0);
    setPlay(true);
    setMuted(false);
  }, [ind]);

  const next = () =>
    setImgInd((p) => {
      if (p < story()?.images?.length - 1) {
        return p + 1;
      } else {
        forward();
        return 0;
      }
    });

  return (
    <div className=" relative flex-1 flex flex-col rounded-2xl shadow-xl bg-gray-900 bg-opacity-20 p-2 text-white min-h-[300px] w-full max-w-sm overflow-hidden ">
      <div className="flex flex-cold items-center z-10">
        {story()
          ?.images?.sort((a, b) => a?.ind - b?.ind)
          ?.map((img) => (
            <TimerItem
              img={img}
              next={next}
              imgInd={imgInd}
              muted={muted}
              ind={ind}
              play={play}
            />
          ))}
      </div>
      {total != ind && (
        <div className="flex items-center justify-between z-10 text-2xl ">
          <UserItem userId={story()?.userId} />
          <div>
            <i
              onClick={(_) => setPlay((p) => !p)}
              className={`ri-${
                play ? "pause" : "play"
              }-line bg-gray-700 p-2 rounded-full bg-opacity-30 hover:bg-opacity-50 cursor-pointer mx-1`}
            />
            <i
              onClick={(_) => setMuted((p) => !p)}
              className={`ri-${
                muted ? "volume-up" : "volume-mute"
              }-line bg-gray-700 p-2 rounded-full bg-opacity-30 hover:bg-opacity-50 cursor-pointer font-medium`}
            />
            <button>
              <i className={`ri-more-line`} />
            </button>
          </div>
        </div>
      )}
      <p className="z-10 text-lg font-semibold">{story()?.body}</p>
      <div className="flex text-lg font-semibold flex-col py-10 items-center justify-center h-full">
        {story()?.images?.[imgInd] && (
          <Image
            className="brightness-[70%]"
            src={story()?.images?.[imgInd]?.url}
            layout="fill"
            objectFit="cover"
          />
        )}

        {total == ind && <p>No More Story</p>}
      </div>
    </div>
  );
}

function TimerItem({ img, imgInd, next, ind, play, muted }) {
  const au = new Audio("audio/short.mp3");
  au.preload = "metadata";
  const [ct, setCt] = useState(0);
  const [duration, setDuration] = useState(0);
  const [res, setRes] = useState(false);

  useEffect(() => {
    setCt(0);
    setDuration(0);
  }, [img, ind]);

  useEffect(() => {
    if (imgInd == img?.ind && play) {
      au?.play();
      if (res) {
        au.currentTime = ct;
      }
    }
    return stop;
  }, [imgInd, ind, play]);

  useEffect(() => {
    if (!play) {
      setRes(true);
    } else {
      setRes(false);
    }
  }, [play]);

  useEffect(() => {
    au.volume = muted ? 0 : 1;
    au.muted = muted;
  }, [muted]);

  const stop = () => au.pause();
  au.ontimeupdate = (e) => setCt(au.currentTime);
  au.onloadedmetadata = (e) => setDuration(e.target.duration);
  au.onended = next;

  return (
    <div className="overflow-hidden flex-1 rounded-md bg-gray-400 shadow-md m-[2px] flex flex-col">
      {muted?.toString()}
      <div className="flex">
        <span
          style={{ width: (ct / duration) * 100 + "%" || 0 }}
          className="bg-white py-[3px]"
        ></span>
      </div>
    </div>
  );
}
