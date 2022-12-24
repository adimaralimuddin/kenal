import { useEffect, useState } from "react";
import useRelations from "../../controls/useRelations";
import useSettings from "../../controls/useSettings";
import useStory from "../../controls/useStory";
import useUser from "../../controls/useUser";
import { useAlert } from "../elements/Alert";
import Writer from "../elements/Writer";
import StoryCommentItem from "./StoryCommentItem";

export default function StoryComments({ story, ind, total }) {
  const { user } = useUser();
  const {
    addStoryComment,
    listenStoryComments,
    checkStoryCommentAllowPrivacy,
  } = useStory();

  const { settings, listenUserSettings } = useSettings();
  const { relations } = useRelations();
  const [comments, setComments] = useState([]);
  const [privacy, setPrivacy] = useState(true);
  const [userSettings, setUserSettings] = useState({});
  const { open } = useAlert();

  useEffect(() => {
    const blockedUsers = settings?.blockedusers;
    if (!story()?.id || !blockedUsers) return;
    let ret1 = listenStoryComments(
      { storyId: story()?.id, blockedUsers },
      setComments
    );
    checkPrivacy();
    const ret = listenUserSettings(story()?.userId, setUserSettings);
    return () => {
      ret1?.();
      ret?.();
    };
  }, [ind, settings]);

  useEffect(() => {
    checkPrivacy();
  }, [ind, settings, userSettings, relations]);

  const checkPrivacy = async () => {
    const priv = await checkStoryCommentAllowPrivacy(story());
    console.log("priv check ", priv);
    setPrivacy(priv);
    return priv;
  };

  const onAddComment = async (data, clear) => {
    const priv = await checkPrivacy();
    if (priv) {
      await addStoryComment({ ...data, story: story() });
      clear();
    } else {
      open(
        "somehow you are not allowed to comment on this story. maybe the user had set the view privacy, or try to follow the user if the view privacy is set only to follower."
      );
    }
  };

  if (total == ind) return null;

  return (
    <div className="flex mx-2 flex-col flex-1 bg-white dark:bg-box-dark max-w-sm rounded-lg min-w-[250px] max-h-[90vh]">
      {privacy && (
        <div className="ring-1d w-full p-2">
          <Writer user={user} text="comment" onPost={onAddComment} />
        </div>
      )}
      <div className="overflow-y-auto h-full p-2d py-2">
        {comments?.map((data) => (
          <StoryCommentItem
            par={[comments, setComments]}
            data={data}
            key={data?.id}
          />
        ))}
      </div>
    </div>
  );
}
