import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toolGetDoc from "../../controls/toolGetDoc";
import useRelations from "../../controls/useRelations";
import useSettings from "../../controls/useSettings";
import useUser from "../../controls/useUser";
import Droper from "../elements/Droper";
import RelationAction from "../reactions/RelationAction";
import UserRelationsCaption from "../user/UserRelationsCaption";
function UserInfoPop({ open, set, par, div, data, userId, show }) {
  const { user } = useUser();
  const [profile, setProfile] = useState(null);
  const [relation, setRelation] = useState(null);
  const { getUserSettings } = useSettings();
  const { listen } = useRelations();
  const [postUserSettings, setPostUserSettings] = useState();

  useEffect(() => {
    if (userId) {
      getInfo();
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    getInitUserSettings();
    if (userId !== user?.uid) return;
    const ret = listen(userId, setRelation);
    return ret;
  }, [userId]);

  const getInitUserSettings = async () => {
    const x = await getUserSettings(userId);
    setPostUserSettings(x);
  };

  const getInfo = async () => {
    const x = await toolGetDoc("profile", userId);
    setProfile(x);
  };

  const joinedAt = new Date(profile?.joinedAt?.toDate())?.toDateString();

  if (!show) return null;
  if (!open) return null;

  return (
    <Droper
      autoClose={false}
      open={open}
      set={set}
      par={"  " + par}
      div={
        "flex pb-2 flex-col p-0 py-0 px-0 overflow-hidden rounded-xl w-full ring-1 " +
        div
      }
      divProps={{
        onClick: (e) => {
          e?.stopPropagation?.();
        },
      }}
    >
      <div className="bg-[url('/img/storybg1.webp')] bg-center bg-cover relative min-h-[100px] ">
        {profile?.featuredImage && (
          <Image
            src={profile?.featuredImage || "img/storybg1.webp"}
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>
      <Link href={`user/${userId}`}>
        <div className=" cursor-pointer hover:underline flex flex-1  w-[300px] pb-2">
          <div className="bg-[url('/img/storybg1.webp')] bg-center bg-cover flex ml-5 ring-[4px] ring-white -mt-6 relative min-h-[80px] max-h-[80px] max-w-[80px] min-w-[80px] rounded-full overflow-hidden hover:scale-125 transition">
            {data?.photoURL && (
              <Image
                src={data?.photoURL}
                width={80}
                height={80}
                objectFit="cover"
              />
            )}
          </div>
          <div className="px-2 pt-1">
            <h3 className=" text-gray-500 dark:text-gray-400 ">
              {data?.displayName}
            </h3>
            <p className=" text-md text-gray-400 dark:text-gray-500 -mt-1">
              {profile?.data?.bio}
            </p>
            {profile?.joinedAt && (
              <small className="text-gray-400 dark:text-gray-500 text-xs underline leading-none">
                joined on {joinedAt}
              </small>
            )}
          </div>
        </div>
      </Link>

      <UserRelationsCaption
        userId={userId}
        relation={relation}
        postsLength={0}
        authId={user?.uid}
        noPost={true}
      />
      <RelationAction
        userId={userId}
        passer={setRelation}
        userSettings={postUserSettings}
        onChatClick={(_) => set(false)}
        showOptions={false}
      />
    </Droper>
  );
}

export default UserInfoPop;
