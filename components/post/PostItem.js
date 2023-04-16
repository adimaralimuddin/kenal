import { useEffect, useState } from "react";
import usePost from "../../controls/usePost";
import useRelations from "../../controls/useRelations";
import useSettings from "../../controls/useSettings";
import CommentMain from "../comment/CommentMain";
import { useAlert } from "../elements/Alert";
import Box from "../elements/Box";
import EditHist from "../elements/EditHist";
import ImgViewer from "../elements/ImgViewer";
import Comp from "../main/Comp";
import PostEditorMain from "../postEditor/PostEditorMain";
import LikeMain from "../reactions/LikeMain";
import PostBodyStyle from "./PostBodyStyle";
import PostHeader from "./PostHeader";

const PostItem = ({ data, state }) => {
  const { removePost, updatePost, set, postPrivacyCheck } = usePost();
  const { relations, checkBlockUser } = useRelations();
  const { listenUserSettings } = useSettings();
  const { open: openAlert, pop } = useAlert();

  useEffect(() => {
    if (!data) return;
    checkPrivacy();
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

  const onUpdatePost = async ({
    prev,
    body,
    images,
    docId,
    imgLength,
    privacy,
  }) => {
    openAlert("Updating post . . . ", true);
    await updatePost({ prev, body, images, docId, imgLength, privacy });
    pop("Post updated!", "check");
  };

  return (
    <div className="box box-ring animate-pop  pb-1 flex flex-col min-h-[300px]  mx-0 px-0 py-0 ">
      {/* <small>{data?.id}</small> */}
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
        docId={data.id}
        postId={data.id}
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
    </div>
  );
};

export default Comp(PostItem, { active: false, open: false, viewEdit: false });
