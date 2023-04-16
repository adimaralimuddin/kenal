import { useEffect, useState } from "react";
import useRelations from "../../controls/useRelations";
import useSettings from "../../controls/useSettings";
import useStory from "../../controls/useStory";
import useUser from "../../controls/useUser";
import UserItem from "../user/UserItem";

export default function StoryItem({ data, onOpen, ind }) {
  const { listenUserSettings } = useSettings();
  const [userSettings, setUserSettings] = useState(false);
  const { user } = useUser();
  const { checkStoryPrivacy } = useStory();
  const [privacy, setPrivacy] = useState(true);
  const { relations } = useRelations();

  useEffect(() => {
    if (!data) return;
    checkPrivacy();
  }, [data, ind, relations]);

  const checkPrivacy = async () => {
    const priv = await checkStoryPrivacy(data);
    setPrivacy(priv);
  };

  useEffect(() => {
    if (!data?.userId) return;
    listenUserSettings(data?.userId, setUserSettings);
  }, [data]);

  if (userSettings?.blockedusers?.find((p) => p == user?.uid)) return null;

  function onOpenHandler() {
    onOpen(ind);
  }

  const isVid = (a = true, b = false) =>
    data?.images?.[0]?.type?.includes("video") ? a : b;

  if (!privacy) return null;

  return (
    <div
      onClick={onOpenHandler}
      style={{
        backgroundImage: `url("${
          data?.images?.[0]?.url || "/img/storybg1.webp"
        }")`,
      }}
      className="min-w-[100px]  transition flex-1 cursor-pointer overflow-hidden bg-center bg-cover bg-no-repeat text-white p-1 flex flex-col  justify-between items-center content-center text-center rounded-xl h-full  max-w-[110px] relative"
    >
      <UserItem
        pop={false}
        className={"m-0 p-0 z-10"}
        userId={data?.userId}
        noName="on"
        small="on"
      />
      <small className="absolute top-0 drop-shadow-md left-0 h-full bg-gray-900  bg-opacity-5 w-full flex-1 overflow-y-clip px-2 flex flex-col items-center justify-center ">
        {data?.body}
      </small>
      {isVid(
        <video
          muted
          loop
          className="absolute top-0 left-0 h-full w-full object-cover object-center object-no-repeat"
          autoPlay
        >
          <source src={data?.images?.[0]?.url} />
        </video>
      )}
    </div>
  );
}
