import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import useStory from "../../controls/useStory";
import useUser from "../../controls/useUser";
import Option from "../elements/Option";
import UserItem from "../user/UserItem";
import PostEditorMain from "../postEditor/PostEditorMain";
import Verifier from "../elements/Verifier";
import useSettings from "../../controls/useSettings";
import StoryTimerItem from "./StoryTimerItem";
import { useAlert } from "../elements/Alert";
import PrivacyIcon from "../elements/PrivacyIcon";
export default function StoryItemViewer({
  total,
  ind,
  story,
  forward,
  setOpenPar,
}) {
  const { block } = useSettings();
  const { user } = useUser();
  const [imgInd, setImgInd] = useState(0);
  const [play, setPlay] = useState(true);
  const [muted, setMuted] = useState(true);
  const [open, setOpen] = useState(false);

  const { removeStory, storyUpdate, stories } = useStory();
  const [deleting, setDeleting] = useState(false);
  const [blocking, setBlocking] = useState(false);
  const { open: openAlert, pop } = useAlert();

  //video properties
  const isVid = (a = true, b = false, ind = imgInd) =>
    story()?.images?.[ind]?.type?.includes("video") ? a : b;
  const vidRef = useRef();
  const vid = () => vidRef?.current;
  const [vidCur, setVidCur] = useState(0);
  const [vidDur, setVidDur] = useState();
  const vidTime = () => (vidCur / vidDur) * 100;
  const reloadVid = (imgInd_ = imgInd) => {
    if (isVid(true, false, imgInd_)) {
      if (!vidRef.current) return;
      vidRef.current.src = story()?.images?.[imgInd_]?.url;
      vidRef.current.currentTime = 0;
      vidRef?.current?.play();
    }
  };

  useEffect(() => {
    setImgInd(0);
    setPlay(true);
    setMuted(false);
    reloadVid(0);
  }, [ind]);

  useEffect(() => {
    reloadVid();
  }, [imgInd]);

  const next = () => {
    setImgInd((p) => {
      if (p < story()?.images?.length - 1) {
        return p + 1;
      } else {
        forward();
        return 0;
      }
    });
    reloadVid(imgInd + 1);
  };

  const onUpdateStory = async (
    prev,
    body,
    images,
    data_,
    imgLength,
    privacy
  ) => {
    await storyUpdate(prev, body, images, story()?.id, privacy);
  };

  const onRemoveStory = () => {
    openAlert("Deleting story . . .  ", true);
    setOpen(false);
    removeStory(story()?.id, () => {
      setOpenPar(false);
      pop("Story deleted!", "check");
    });
  };
  const onBlockStory = async () => {
    openAlert("blocking story . . .", true);
    await block("blockedstories", story()?.userId);
    setOpenPar(false);
    pop("story blocked succesfully.");
  };

  let options = [];
  const authOptions = [
    {
      text: "Update Story",
      action: () => setOpen(true),
      icon: "bin-delete-5",
    },
    {
      text: "Delete Story",
      action: () => setDeleting(true),
      icon: "bin-delete-5",
    },
  ];
  const userOptions = [
    {
      text: "Block Story ",
      action: () => setBlocking(true),
    },
  ];

  if (story()?.userId == user?.uid) {
    options = options?.concat(authOptions);
  } else {
    options = options?.concat(userOptions);
  }

  return (
    <div
      style={{
        backgroundImage: `url("/img/storybg1.webp")`,
      }}
      className="bg-center bg-cover bg-no-repeat relative flex-1 flex flex-col rounded-2xl shadow-xl bg-gray-900 p-2 text-white min-h-[300px] w-full max-w-sm overflow-hidden  "
    >
      <Verifier open={deleting} set={setDeleting} onYes={onRemoveStory} />
      <Verifier open={blocking} set={setBlocking} onYes={onBlockStory} />
      <TopBar
        story={story}
        imgInd={imgInd}
        next={next}
        muted={muted}
        ind={ind}
        play={play}
        vidTime={vidTime}
        setImgInd={setImgInd}
      />
      {total != ind && (
        <Header
          story={story}
          setPlay={setPlay}
          setMuted={setMuted}
          play={play}
          muted={muted}
          options={options}
          vid={vid}
        />
      )}

      <PostEditorMain
        onUpdate={onUpdateStory}
        data={story()}
        open={open}
        setOpen={setOpen}
      />
      <p className="text-white drop-shadow-lg  flex-1 z-10 text-center text-lg font-semibold flex flex-col justify-center items-center ">
        {story()?.body}
      </p>
      <div className="flex text-lg font-semibold flex-col py-10 items-center justify-center h-full ">
        {story()?.images?.[imgInd] &&
          isVid(
            <video
              ref={vidRef}
              className="absolute  top-0 left-0  object-cover  object-center h-full w-full "
              autoPlay
              muted={muted}
              onEnded={(e) => {
                next();
              }}
              preload="metadata"
              onLoadedMetadata={(e) => {
                setVidDur(e.target.duration);
              }}
              onTimeUpdate={(e) => {
                setVidCur(e.target?.currentTime);
              }}
            >
              <source src={story()?.images?.[imgInd]?.url} />
            </video>,
            <Image
              className="brightness-[70%]"
              src={story()?.images?.[imgInd]?.url}
              layout="fill"
              objectFit="cover"
            />
          )}
        {ind == stories?.length && <p>No More Story</p>}
      </div>
    </div>
  );
}

function Header({ story, setPlay, setMuted, play, muted, options, vid }) {
  return (
    <div className="flex items-center justify-between z-20 ">
      <UserItem
        userId={story()?.userId}
        className=" text-white "
        textClass=" text-white "
      />
      <div className=" flex items-center justify-center ">
        <PrivacyIcon
          className=" bg-gray-700 bg-opacity-30 text-white p-2 dark:text-white"
          privacy={story()?.privacy}
        />
        <i
          onClick={(_) =>
            setPlay((p) => {
              if (p) {
                vid()?.pause();
              } else {
                vid()?.play();
              }
              return !p;
            })
          }
          className={`ri-${
            play ? "pause" : "play"
          }-line bg-gray-700 p-1 px-2 aspect-square rounded-full bg-opacity-30 hover:bg-opacity-50 cursor-pointer mx-1 text-2xl`}
        />
        <i
          onClick={(_) => setMuted((p) => !p)}
          className={`ri-${
            muted ? "volume-mute" : "volume-up"
          }-line bg-gray-700 p-1 px-2 rounded-full bg-opacity-30 hover:bg-opacity-50 cursor-pointer font-medium text-2xl`}
        />
        <Option
          options={options}
          iconClass="dark:text-white bg-gray-700 bg-opacity-30 px-2 p-1 ml-1 dark:hover:bg-opacity-50 hover:bg-opacity-50 text-md text-2xl text-white "
        />
      </div>
    </div>
  );
}

function TopBar({ story, imgInd, next, muted, ind, play, vidTime, setImgInd }) {
  return (
    <div className="flex flex-cold items-center z-10 px-1 ">
      {story()
        ?.images?.sort((a, b) => a?.ind - b?.ind)
        ?.map((img) => (
          <StoryTimerItem
            key={img?.url}
            img={img}
            next={next}
            imgInd={imgInd}
            muted={muted}
            ind={ind}
            play={play}
            vidTime={vidTime}
            setImgInd={setImgInd}
          />
        ))}
    </div>
  );
}
