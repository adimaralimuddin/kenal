import {
  collection,
  doc,
  documentId,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useRelations from "../../controls/useRelations";
import useSettings from "../../controls/useSettings";
import useUser from "../../controls/useUser";
import { db } from "../../firebase.config";
import UserPosts from "../post/UserPosts";
import ProfileMainNavs from "../profile/ProfileMainNavs";
import RelationAction from "../reactions/RelationAction";
import RelationsLists from "../relations/RelationsLists";
import UserAbout from "../user/UserAbout";
import UserProfileCaption from "../user/UserProfileCaption";
import UserRelationsCaption from "../user/UserRelationsCaption";

function MainUserPage({ params }) {
  const { userId } = params;
  const { user, loaded } = useUser();
  const [relation, setRelation] = useState();
  const [postsLength, setPostsLength] = useState();
  const [profile, setProfile] = useState({});
  const [userSettings, setUserSettings] = useState(null);
  const { listen, settings, listenUserSettings } = useSettings();
  const router = useRouter();
  const tab = router.query?.profileTab || "posts";

  const { canPostToOther, initRelation } = useRelations();

  useEffect(() => {
    if (!userId || !loaded || !user) return;
    const ret = listenUserSettings(userId, setUserSettings);
    const p = listen();
    return () => {
      ret?.();
      p?.();
    };
  }, [userId, user]);

  useEffect(() => {
    if (!userId || !user) return;
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
    <div className=" min-h-[100vh] max-w-4xl flex flex-col gap-4 ">
      <div className=" box p-0 overflow-hiddend  pb-2   ">
        <UserProfileCaption profile={profile} authId={user?.uid} />
        {/* <UserRelationsCaption
          userId={userId}
          relation={relation}
          postsLength={postsLength}
          authId={user?.uid}
        /> */}

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
      <div className="flex flex-col gap-4 ">
        <UserAbout
          authId={user?.uid}
          profile={profile}
          profileSettings={userSettings}
        />
        <ProfileMainNavs />
        {tab === "posts" && (
          <UserPosts
            userId={userId}
            authId={user?.uid}
            setLength={setPostsLength}
            canPost={canPostToOther}
          />
        )}

        {tab === "followers" && (
          <RelationsLists
            authId={user?.uid}
            text="Followers"
            data={relation?.followers || []}
            userId={userId}
          />
        )}
        {tab === "followings" && (
          <RelationsLists
            authId={user?.uid}
            text="followings"
            data={relation?.followings || []}
            userId={userId}
          />
        )}
      </div>
    </div>
  );
}

export default MainUserPage;
