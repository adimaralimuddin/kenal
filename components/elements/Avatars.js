import Image from "next/image";
import React, { useEffect, useState } from "react";
import toolGetDoc from "../../controls/toolGetDoc";

const Avatars = ({ userIds }) => {
  const [profiles, setProfiles] = useState([]);
  return (
    <div className="flex">
      {userIds?.slice(0, 3)?.map((id) => (
        <Item id={id} key={id} setProfiles={setProfiles} />
      ))}
      <small className="pl-4 text- text-slate-500 dark:text-slate-400">
        {profiles?.[0]?.displayName}
        {userIds?.length > 1 &&
          ` and  ${userIds?.length - 1} other
 ${userIds?.length - 1 > 1 ? "s" : ""}`}
      </small>
    </div>
  );
};

const Item = ({ id, setProfiles }) => {
  const [profile, setProfile] = useState();
  useEffect(() => {
    toolGetDoc("profile", id, (prof) => {
      setProfile(prof);
      setProfiles((p) => [...p, prof]);
    });
  }, [id]);
  return (
    <div className="relative w-[23px] h-[23px] rounded-full ring-2 ring-white bg-slate-200 dark:bg-slate-600 dark:ring-black -mr-2">
      {profile?.photoURL && (
        <Image
          className="rounded-full "
          src={profile.photoURL}
          objectFit="fill"
          layout="fill"
          alt=""
        />
      )}
    </div>
  );
};

export default Avatars;
