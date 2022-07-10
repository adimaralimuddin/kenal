import Image from "next/image";
import ImgInput from "../elements/ImgInput";
import Icon from "../elements/IconBtn";
import { useState } from "react";
import toolUpdateImage from "../../controls/toolUpdateImage";
import useUser from "../../controls/useUser";

export default function UserProfileCaption({ profile }) {
  const { user } = useUser();
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
    <div className="flex flex-col">
      <div className="h-[50%] rounded-[30px] rounded-t-none overflow-hidden relative flex-1 min-h-[270px] mx-auto w-full">
        <Image
          src={
            imgs2?.imgs?.[0]?.url ||
            profile?.featuredImage ||
            "/img/storybg.webp"
          }
          layout="fill"
          objectFit="cover"
        />

        <div className="z-50 absolute top-3 ring-2d ring-whited right-3">
          <ImgInput onInput={onProfileInput2} set={setImgs2} single="on">
            {user?.uid == profile?.id && (
              <Icon className="ring-2 ring-white">image-edit</Icon>
            )}
          </ImgInput>
        </div>
      </div>

      <div className="relative min-h-[150px] ring-[4px] ring-white mx-auto min-w-[150px] rounded-xl overflow-hiddend -mt-16 flex flex-col">
        <Image
          className="rounded-xl"
          src={imgs?.imgs?.[0]?.url || profile?.photoURL || "/img/storybg.webp"}
          layout="fill"
          objectFit="cover"
        />
        <div className="z-50 absolute -top-3 ring-2d ring-whited -right-3">
          <ImgInput onInput={onProfileInput} set={setImgs} single="on">
            {user?.uid == profile?.id && (
              <Icon className="ring-2 ring-white">image-edit</Icon>
            )}
          </ImgInput>
        </div>
      </div>
      <h2 className=" bg-transparent bg-opacity-0 text-center text-xl text-gray-600">
        {profile?.displayName}
      </h2>
      <div></div>
    </div>
  );
}
