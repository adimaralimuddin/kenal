import Box from "../elements/Box";
import usePost from "../../controls/usePost";
import ImgViewer from "../elements/ImgViewer";
import CommentMain from "../comment/CommentMain";
import LikeMain from "../reactions/LikeMain";
import PostEditorMain from "../postEditor/PostEditorMain";
import { useEffect } from "react";
import EditHist from "../elements/EditHist";
import useRelations from "../../controls/useRelations";
import useSettings from "../../controls/useSettings";
import Comp from "../main/Comp";
import PostBodyStyle from "./PostBodyStyle";
import PostHeader from "./PostHeader";
import { useAlert } from "../elements/Alert";

const PostItem = ({ data, state }) => {
  const { removePost, updatePost, set, postPrivacyCheck } = usePost();
  const { relations, checkBlockUser } = useRelations();
  const { listenUserSettings } = useSettings();
  const { open: openAlert, pop } = useAlert();

  useEffect(() => {
    if (!data) return;
    const ret = checkPrivacy();
  }, [data, relations, state?.postUserSettings]);

  useEffect(() => {
    if (!data?.userId?.[0] || data?.userId?.[0]?.length < 20) return;
    const retUserSettings = listenUserSettings(data?.userId?.[0], (val) =>
      state.set({ postUserSettings: val })
    );
    return () => {
      retUserSettings?.();
    };
  }, [data?.userId?.[0]]);

  const checkPrivacy = async () => {
    const privacyResult = await postPrivacyCheck(data, state?.postUserSettings);
    state.set({ privacy: privacyResult });
  };

  if (checkBlockUser(state?.postUserSettings)) {
    return null;
  }

  if (!state?.privacy) return null;

  const onUpdatePost = async (
    prev,
    body,
    images,
    docId,
    imgLength,
    privacy
  ) => {
    openAlert("Updating post . . . ", true);
    await updatePost(prev, body, images, docId, imgLength, privacy);
    pop("Post updated!", "check");
  };

  return (
    <Box className="animate-pop duration-500 flex flex-col text-gray-500 min-h-[300px] my-5 mx-0 px-0 py-0 shadow-sm ring-[1px] ring-slate-200">
      <PostHeader data={data} state={state} removePost={removePost} />
      <PostBodyStyle data={data} />
      <EditHist show={state?.viewEdit} data={data} className="text-sm px-2" />

      <PostEditorMain
        data={data}
        onUpdate={onUpdatePost}
        setOpen={state.key("open")}
        open={state?.open}
      />

      <ImgViewer imgs={data?.images} oppose={data?.vids} />
      <LikeMain
        data={data}
        col_="posts"
        className="pt-2"
        likeActiveStyle=" text-white bg-indigo-300 p-1 text-white dark:text-white"
        loveActiveStyle="text-white bg-pink-300 p-1 pt-2 dark:text-white "
        likeClass="hover:animation-bounce"
        loveClass="hover:animation-bounce"
      />
      <CommentMain
        postUserSettings={state?.postUserSettings}
        postId={data?.id}
        postUserId={data?.userId?.[0]}
        hookComments={(hookComments) => set({ hookComments })}
      />
    </Box>
  );
};

export default Comp(PostItem, { active: false, open: false, viewEdit: false });
