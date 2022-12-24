import Image from "next/image";
import ImgInput from "../elements/ImgInput";
import Icon from "../elements/IconBtn";
import { useState } from "react";
import toolUpdateImage from "../../controls/toolUpdateImage";

export default function UserProfileCaption({ profile, authId }) {
  const [imgs, setImgs] = useState({ imgs: [{ url: profile?.photoURL }] });
  const [imgs2, setImgs2] = useState({
    imgs: [{ url: profile?.featuredImage }],
  });

  function onProfileInput(files) {
    toolUpdateImage(
      "profile",
      profile?.id,
      "photoURL",
      files?.[0]?.file,
      () => {}
    );
  }

  function onProfileInput2(files) {
    toolUpdateImage(
      "profile",
      profile?.id,
      "featuredImage",
      files?.[0]?.file,
      () => {}
    );
  }

  return (
    <div className="flex flex-col ring-1d">
      <div className="h-[20%] overflow-hidden relative flex-1 min-h-[180px] mx-auto w-full">
        <Image
          src={
            imgs2?.imgs?.[0]?.url ||
            profile?.featuredImage ||
            "/img/storybg1.webp"
          }
          layout="fill"
          objectFit="cover"
        />

        <div className="z-10 absolute top-3 ring-2d ring-whited right-3">
          <ImgInput onInput={onProfileInput2} set={setImgs2} single="on">
            {authId == profile?.id && (
              <Icon className="ring-2 ring-white">image-edit</Icon>
            )}
          </ImgInput>
        </div>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center px-[7%] gap-4 content-center items-center">
        <div className="relative min-h-[160px] ring-[5px] ring-white dark:ring-0 min-w-[160px] rounded-xl overflow-hiddend -mt-28  flex flex-col ">
          <Image
            className="rounded-xl"
            src={
              imgs?.imgs?.[0]?.url || profile?.photoURL || "/img/storybg1.webp"
            }
            layout="fill"
            objectFit="cover"
          />
          <div className="z-50 absolute -top-3 ring-2d ring-whited -right-3">
            <ImgInput onInput={onProfileInput} set={setImgs} single="on">
              {authId == profile?.id && (
                <Icon className="ring-2 ring-white">image-edit</Icon>
              )}
            </ImgInput>
          </div>
        </div>
        <h2 className=" bg-transparent whitespace-nowrap bg-opacity-0 text-center text-2xl text-gray-600 dark:text-gray-400 ">
          {profile?.displayName}
        </h2>
      </div>
    </div>
  );
}
