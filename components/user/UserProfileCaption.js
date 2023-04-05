import Image from "next/image";
import { useState } from "react";
import toolUpdateImage from "../../controls/toolUpdateImage";
import Icon from "../elements/IconBtn";
import ImgInput from "../elements/ImgInput";

export default function UserProfileCaption({ profile, authId }) {
  const [avatarImage, setAvatarImage] = useState({
    imgs: [{ url: profile?.photoURL }],
  });
  const [featuredImage, setFeaturedImage] = useState({
    imgs: [{ url: profile?.featuredImage }],
  });

  function onAvatarImageUpdateHandler(files) {
    toolUpdateImage(
      "profile",
      profile?.id,
      "photoURL",
      files?.[0]?.file,
      () => {}
    );
  }

  function onFeaturedimageUpdatehandler(files) {
    toolUpdateImage(
      "profile",
      profile?.id,
      "featuredImage",
      files?.[0]?.file,
      () => {}
    );
  }

  return (
    <div className="flex flex-col ">
      <div className="h-[20%] overflow-hiddend  relative flex-1 min-h-[180px] mx-auto w-full">
        <Image
          src={
            featuredImage?.imgs?.[0]?.url ||
            profile?.featuredImage ||
            "/img/storybg1.webp"
          }
          layout="fill"
          objectFit="cover"
          className=" rounded-tr-xl rounded-tl-xl"
          alt=""
        />
        <div className="z-10 absolute top-5  ring-whited right-3">
          <ImgInput
            onInput={onFeaturedimageUpdatehandler}
            set={setFeaturedImage}
            single="on"
          >
            {authId == profile?.id && (
              <Icon className="ring-2 ring-white">pencil</Icon>
            )}
          </ImgInput>
        </div>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center px-[7%] gap-4 content-center items-center ">
        <div className="relative min-h-[130px] min-w-[130px]  p-2  -mt-16  flex flex-col ring-[6px] ring-white dark:ring-bg-dark rounded-full ">
          <Image
            className=" rounded-full "
            src={
              avatarImage?.imgs?.[0]?.url ||
              profile?.photoURL ||
              "/img/storybg1.webp"
            }
            layout="fill"
            objectFit="cover"
            alt=""
          />
          <div className="z-50  absolute -bottom-[-20px]  ring-whited -right-2">
            <ImgInput
              onInput={onAvatarImageUpdateHandler}
              set={setAvatarImage}
              single="on"
            >
              {authId == profile?.id && (
                <Icon className="ring-2 box bg-white  ring-white">pencil</Icon>
              )}
            </ImgInput>
          </div>
        </div>
        <h2 className="font-medium bg-transparent whitespace-nowrap bg-opacity-0 text-center text-xl text-gray-600 dark:text-gray-400 ">
          {profile?.displayName}
        </h2>
        <p>{profile?.bio}</p>
      </div>
    </div>
  );
}
