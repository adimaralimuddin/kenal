import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import IconBtn from "./IconBtn";

export default function ImgViewer({ imgs, className }) {
  const [cur, setCur] = useState(0);
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState(imgs?.[0]?.url);
  const vid = useRef();

  const sortedImages = imgs?.sort((a, b) => a.ind - b.ind);

  useEffect(() => {
    setSrc(imgs?.[cur]?.url);
    if (vid?.current) {
      vid.current.src = imgs?.[cur]?.url;
      vid.current?.play();
    }
  }, [cur]);

  const type = (img, vid, ind = cur) =>
    imgs?.[ind]?.type?.includes("video") ? vid : img;

  const Img = ({ ind = 0, css, autoPlay = true, imgCss, style }) => {
    // return (
    //   <Image
    //     className={
    //       "hover:scale-110 object-cover transition duration-[2s] " + imgCss
    //     }
    //     src={imgs?.[ind]?.url}
    //     layout="fill"
    //     objectFit="contain"
    //     alt=""
    //   />
    // );
    return (
      <div
        style={style}
        onClick={(_) => {
          setCur(ind);
          setOpen(true);
        }}
        className={"relative flex flex-1"}
        // className={
        //   "cursor-pointer bg-green-400  relative overflow-hidden flex-1 h-[100%] dark:brightness-75 dark:hover:brightness-100   bg-slate-200d dark:bg-slate-600 p-1  " +
        //   css
        // }
      >
        {type(
          <Image
            className={
              "hover:scale-110 object-cover bg-center transition duration-[2s] " +
              imgCss
            }
            src={imgs?.[ind]?.url}
            layout="fill"
            objectFit="cover"
            alt=""
          />,
          <div
            style={{
              // backgroundImage: `url('hero-image.png')`,
              background: `url('${imgs?.[ind]?.url}')`,
            }}
            className={"bg-slate-200 relative h-full w-full " + imgCss}
          >
            <video
              className={
                "absolute top-0 left-0 h-[100%] w-[100%] object-cover  "
              }
              muted
              autoPlay={autoPlay}
              loop
              src={imgs?.[ind]?.url}
            >
              {/* <source src={imgs?.[ind]?.url} /> */}
            </video>
          </div>,
          ind
        )}
      </div>
    );
  };

  const View = () => {
    switch (imgs?.length) {
      case 1:
        return (
          <div className={"flex flex-col w-full aspect-video   " + className}>
            <Img ind={0} css="max-h-[400px] dmin-h-[400px]" />
          </div>
        );
      case 2:
        return (
          <div className={"  w-full aspect-video flex gap-[1px] " + className}>
            <Img ind={0} />
            <Img ind={1} />
          </div>
        );
      case 3:
        return (
          <div
            className={"flex  flex-col  gap-[1px]  min-h-[350px]  " + className}
          >
            <Img ind={0} css="flex-2 min-h-[180px] max-h-[180px]" />
            <div className="  flex flex-1 min-h-[155px] max-h-[155px]  gap-[1px] ">
              <Img ind={1} />
              <Img ind={2} />
            </div>
          </div>
        );
      case 4:
        return (
          <div
            className={
              "flex min-h-[300px] max-h-[300px]  gap-[1px]  " + className
            }
          >
            <Img ind={0} css="flex-1" />
            <div className="flex flex-col w-[35%] gap-[1px] ">
              <Img ind={1} />
              <Img ind={2} />
              <Img ind={3} />
            </div>
          </div>
        );
      case 5:
        return (
          <div
            className={"flex gap-[1px] flex-col min-h-[350px]  " + className}
          >
            <div className="flex-1 flex  min-h-[260px] max-h-[300px] gap-[1px] ">
              <Img ind={0} className="flex-1" />
              <div className="flex flex-col w-[40%]  gap-[1px] ">
                <Img ind={1} />
                <Img ind={2} />
              </div>
            </div>
            <div className="flex-1 flex min-h-[130px] max-h-[130px]  gap-[1px]  ">
              <Img ind={3} />
              <Img ind={4} />
            </div>
          </div>
        );
      case 6:
        return (
          <div className={"flex flex-col   gap-[1px]  " + className}>
            <div className="flex-1 flex min-h-[300px] max-h-[320px] gap-[1px] ">
              <Img ind={0} className="flex-2" />
              <div className="flex flex-col w-[40%] gap-[1px] ">
                <Img ind={1} />
                <Img ind={2} />
              </div>
            </div>
            <div className="flex-1 flex min-h-[120px] max-h-[120px] gap-[1px] ">
              <Img ind={3} />
              <Img ind={4} />
              <Img ind={5} />
            </div>
          </div>
        );
      case 7:
        return (
          <div className={"flex flex-col  gap-[1px]  " + className}>
            <div className="flex-1 flex min-h-[230px] max-h-[230px] gap-[1px] ">
              <Img ind={0} className="flex-2" />
              <div className="flex flex-col w-[40%] gap-[1px] ">
                <Img ind={1} />
                <Img ind={2} />
              </div>
            </div>
            <div className="flex-1 flex min-h-[120px] max-h-[120px] gap-[1px] ">
              <Img ind={3} />
              <Img ind={4} />
              <div className="flex-1 flex relative ">
                <Img ind={5} css="m-0" />
                <button
                  onClick={(_) => {
                    setCur(5);
                    setOpen(true);
                  }}
                  className="hover:opacity-70d rounded-none hover:bg-opacity-40 absolute w-full h-full text-center flex items-center justify-center text-xl text-white font-semibold bg-pink-800 bg-opacity-30"
                >
                  +{imgs?.length - 6} More
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mt-[1px] ">
      <View />
      {open && (
        <div className="z-50 backdrop-blur-lg flex flex-col items-centerd justify-center  fixed top-0 left-0 w-full h-full bg-gray-900 overflow-y-auto bg-opacity-80 ">
          <button
            onClick={(_) => setOpen(false)}
            className="absolute top-0 right-5 text-white font-semibold text-lg hover:font-bold"
          >
            Close
          </button>
          <div className="flex flex-1 items-center justify-between  m-3 max-h-[70vh] text-2xl">
            <IconBtn
              onClick={(_) =>
                setCur((p) => (p <= 0 ? imgs?.length - 1 : p - 1))
              }
            >
              arrow-left-s
            </IconBtn>
            <div className="flex-1 h-[100%] px-5 justify-center flex relative">
              {type(
                <Image
                  src={imgs?.[cur]?.url}
                  objectFit="contain"
                  layout="fill"
                />,
                <video ref={vid} autoPlay loop controls>
                  <source src={src} />
                </video>
              )}
            </div>
            <IconBtn
              onClick={(_) =>
                setCur((p) => (p >= imgs?.length - 1 ? 0 : p + 1))
              }
            >
              arrow-right-s
            </IconBtn>
          </div>
          <div className="flex overflow-x-auto w-[90%] mx-auto justify-center items-center ">
            {imgs?.map((img, ind) => (
              <div
                className={
                  "flex rounded-md m-1 min-w-[100px] min-h-[100px] " +
                  (ind == cur && "ring-white ring-2")
                }
                key={ind}
              >
                <Img
                  ind={ind}
                  css=" m-0 max-w-[100px] max-h-[100px] bg-cover object-cover "
                  loop
                  autoPlay={true}
                  imgCss="object-fill bg-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
