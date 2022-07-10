import { useEffect, useState } from "react";
import useUser from "../../controls/useUser";
import UserProfileCaption from "../user/UserProfileCaption";
import UserRelationsCaption from "../user/UserRelationsCaption";
import UserPosts from "../post/UserPosts";
import UserAbout from "../user/UserAbout";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase.config";
import RelationAction from "../reactions/RelationAction";

function MainUserPage({ params }) {
  const { userId } = params;
  const { user } = useUser();
  const [relation, setRelation] = useState();
  const [postsLength, setPostsLength] = useState();
  const [profile, setProfile] = useState();

  useEffect(() => {
    if (userId) {
      onSnapshot(doc(db, "profile", userId), (snap) => {
        setProfile({ ...snap?.data(), id: snap?.id });
      });
    }
  }, [userId]);

  return (
    <div className=" min-h-[100vh]  max-w-3xl mx-auto">
      <div className=" bg-white px-2 mx-2 dark:bg-slate-700">
        <UserProfileCaption profile={profile} />
        <UserRelationsCaption relation={relation} postsLength={postsLength} />

        {user?.uid !== profile?.id && (
          <RelationAction
            relation={relation}
            user={user}
            userId={userId}
            passer={setRelation}
          />
        )}
      </div>
      <div className="py-2  content-center sm:flex   flex-wrapd justify-between ring-d1">
        <div className="flex-[1] pt-3">
          <UserAbout authId={user?.uid} profile={profile} />
        </div>
        <div className="flex-[2]">
          <UserPosts
            authId={user?.uid}
            userId={userId}
            setLength={setPostsLength}
          />
        </div>
      </div>
    </div>
  );
}

export default MainUserPage;
