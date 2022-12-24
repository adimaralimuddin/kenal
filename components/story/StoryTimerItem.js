import { useState, useRef, useEffect } from "react";

export default function StoryTimerItem({
  img,
  imgInd,
  next,
  ind,
  play,
  muted,
  vidTime,
  setImgInd,

}) {
  const [ct, setCt] = useState(0);
  const [duration, setDuration] = useState(0);
  const [res, setRes] = useState(false);
  const a = useRef();
  const ad = () => a?.current;
  const time = () => (ct / duration) * 100;

  useEffect(() => {
    setCt(0);
    ad().currentTime = 0;
  }, [img, ind]);

  const isVid = (a = true, b = false) => (img?.type?.includes("video") ? a : b);

  useEffect(() => {
    if (isVid()) {
      stop();
    } else {
      if (imgInd == img?.ind && play) {
        ad()?.play();
        if (res) {
          ad().currentTime = ct;
        }
      } else if (imgInd !== img?.ind) {
        stop();
      }
    }
  }, [imgInd, ind, play]);

  useEffect(() => {
    if (!play) {
      setRes(true);
      stop();
    } else {
      setRes(false);
    }
  }, [play]);

  const stop = () => ad()?.pause();

  const onClick = () => setImgInd(img?.ind);

  return (
    <div
      onClick={onClick}
      className={
        "cursor-pointer hover:scale-y-[2] overflow-hidden flex-1 rounded-full bg-slate-400 shadow-md m-[2px] flex flex-col "
      }
    >
      <audio
       
        muted={muted}
        ref={a}
        src="audio/story.mp3"
        onTimeUpdate={() => {
          setCt(ad().currentTime);
        }}
        preload="metadata"
        onLoadedMetadata={(e) => {
          setDuration(e.target.duration);
        }}
        onEnded={() => {
          next();
        }}
      />
      <div className="flex">
        <span
          style={{
            width: isVid(imgInd == img?.ind && vidTime(), time()) + "%" || 0,
          }}
          className="bg-white py-[3px]"
        ></span>
      </div>
    </div>
  );
}
