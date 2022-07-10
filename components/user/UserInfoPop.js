import Image from "next/image";
import { useEffect, useState } from "react";
import Droper from "../elements/Droper";
import toolGetDoc from "../../controls/toolGetDoc";
import Link from "next/link";
import RelationAction from "../reactions/RelationAction";

function UserInfoPop({ open, set, par, div, data, userId, show }) {
  if (!show) return null;
  if (!open) return null;
  const [profile, setProfile] = useState();
  const [relation, setRelation] = useState();

  useEffect(() => {
    if (userId) {
      getInfo();
    }
  }, [userId]);

  const getInfo = async () => {
    const x = await toolGetDoc("profile", userId);
    setProfile(x);
  };

  return (
    <Droper
      autoClose={false}
      open={open}
      set={set}
      par={"" + par}
      div={
        "flex flex-col p-0 py-0 px-0 overflow-hidden rounded-xl w-full ring-1 " +
        div
      }
    >
      <div className="relative min-h-[100px] ring-1d bg-purple-400 ">
        {profile?.featuredImage && (
          <Image
            src={profile?.featuredImage || "img/storybg.webp"}
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>
      <Link href={`user/${userId}`}>
        <div className=" cursor-pointer hover:underline flex flex-1  w-[300px] pb-2">
          <div className="flex ml-5 ring-[4px] ring-white -mt-6 relative min-h-[80px] max-h-[80px] max-w-[80px] min-w-[80px] rounded-full overflow-hidden">
            {data?.avatar && (
              <Image
                src={data?.avatar}
                width={80}
                height={80}
                objectFit="contain"
              />
            )}
          </div>
          <div className="px-2 pt-1">
            <h3 className=" text-gray-500 ">{data?.userName}</h3>
            <p className=" text-md text-gray-400 -mt-1">{profile?.data?.bio}</p>
            <small className="text-gray-400 text-xs underline leading-none">
              joined on 20,420
            </small>
          </div>
        </div>
      </Link>
      <hr />
      <div className="flex flex-wrap text-sm py-2 justify-around text-gray-500">
        <p className="flex-1 px-2 text-center">
          {relation?.followers?.length} Followers{" "}
        </p>
        <p className="flex-1 px-2 text-center">
          {relation?.followings?.length} Followings{" "}
        </p>
      </div>
      <RelationAction
        userId={userId}
        passer={setRelation}
        onChatClick={(_) => set(false)}
      />
    </Droper>
  );
}

export default UserInfoPop;
