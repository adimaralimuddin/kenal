import { useEffect, useState } from "react";
import useUser from "../../controls/useUser";
import UserProfileCaption from "../user/UserProfileCaption";
import UserRelationsCaption from "../user/UserRelationsCaption";
import UserPosts from "../post/UserPosts";
import UserAbout from "../user/UserAbout";
import {
  collection,
  doc,
  documentId,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import RelationAction from "../reactions/RelationAction";
import useRelations from "../../controls/useRelations";
import useSettings from "../../controls/useSettings";
import Image from "next/image";

function MainUserPage({ params }) {
  const { userId } = params;
  const { user, loaded } = useUser();
  const [relation, setRelation] = useState();
  const [postsLength, setPostsLength] = useState();
  const [profile, setProfile] = useState({});
  const [userSettings, setUserSettings] = useState(null);
  const { listen, settings, listenUserSettings } = useSettings();

  const { canPostToOther, initRelation } = useRelations();

  useEffect(() => {
    if (!userId || !loaded) return;
    const ret = listenUserSettings(userId, setUserSettings);
    const p = listen();
    return () => {
      ret?.();
      p?.();
    };
  }, [userId, user]);

  useEffect(() => {
    const blockedusers = settings?.blockedusers;
    const userBlockLists = userSettings?.blockedusers;

    if (userBlockLists?.find((p) => p == user?.uid)) {
      return setProfile(undefined);
    }

    if (!blockedusers) {
      onSnapshot(doc(db, "profile", userId), (doc) => {
        const profile_ = { id: doc?.id, ...doc?.data() };
        setProfile(profile_);
      });
      return;
    }

    const q = query(
      collection(db, "profile"),
      where(documentId(), "==", userId),
      where(
        documentId(),
        "not-in",
        blockedusers?.length != 0 ? blockedusers : ["dfsd"]
      )
    );

    const retProfile = onSnapshot(q, (snap) => {
      const d = snap.docs?.map((d) => ({ ...d?.data(), id: d.id }));
      setProfile(d?.[0]);
    });

    return retProfile;
  }, [settings, userSettings]);

  useEffect(() => {
    if (!user) return;
    const ret = initRelation();
    return () => ret?.();
  }, [user]);

  if (!profile && user) {
    return (
      <div className="text-xl flex-col gap-3 font-semibold text-slate-500 dark:text-slate-500 text-center p-3 flex items-center justify-center min-h-[90vh]">
        <div className=" shadow-lg relative w-full aspect-square max-w-[120px] rounded-full overflow-hidden">
          <Image src="/img/user.png" layout="fill" objectFit="fit" />
        </div>
        <h1>
          this user might not exist, or you might have blocked his/her account.
        </h1>
      </div>
    );
  }

  return (
    <div className=" min-h-[100vh] w-full max-w-3xl mx-auto ">
      <div className=" bg-white dark:bg-box-dark md:mx-2 mx-0 ">
        <UserProfileCaption profile={profile} authId={user?.uid} />
        <UserRelationsCaption
          userId={userId}
          relation={relation}
          postsLength={postsLength}
          authId={user?.uid}
        />

        {user?.uid !== profile?.id && profile && (
          <RelationAction
            relation={relation}
            userSettings={userSettings}
            userId={userId}
            passer={setRelation}
            show={profile}
          />
        )}
      </div>
      <div className="py-2   content-center sm:flex   flex-wrapd justify-between ">
        <div className="flex-[1] mb-5">
          <UserAbout
            authId={user?.uid}
            profile={profile}
            profileSettings={userSettings}
          />
        </div>
        <div className="flex-[2]">
          <UserPosts
            userId={userId}
            authId={user?.uid}
            setLength={setPostsLength}
            canPost={canPostToOther}
          />
        </div>
      </div>
    </div>
  );
}

export default MainUserPage;
