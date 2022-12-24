import Box from "../elements/Box";
import useUser from "../../controls/useUser";
import usePost from "../../controls/usePost";
import ButtonPrimary from "../elements/ButtonPrim";
import ImgInput from "../elements/ImgInput";
import ImgEditor from "../elements/ImgEditor";
import Modal from "../elements/Modal";
import InputPrivacy from "../elements/InputPrivacy";
import UserItem from "../user/UserItem";
import Image from "next/image";
import useSettings from "../../controls/useSettings";
import { toolAutoGrow } from "../../tools/toolUi";
import { useAlert } from "../elements/Alert";
import { useState } from "react";

export default function PostAdder({ className, to }) {
  const { user } = useUser();
  const { settings } = useSettings();
  const { set, body, addPost, imgs, loading, vids, uploadVids } = usePost();
  const { open, pop } = useAlert();
  const [toUploadvids, setToUploadvids] = useState(false);

  const onPost = () => {
    if (body?.trim() === "") {
      return open("Post's body must not be empty!");
    }
    if (!user) {
      open("you must signin to add post");
      return set({ body: "" });
    }

    if (vids) {
      open("you will be notified when videos are uploaded.");
    } else {
      open("Adding post . . . ", true);
    }

    addPost(to !== user?.uid && to, () => {
      if (vids) {
        set({ uploadVids: true });
      } else {
        pop("Post Added!", "check", 1);
      }
    });
  };

  if (!user) return null;

  return (
    <Box
      className={
        "transition duration-500 flex  flex-col items-centerd  mx-auto px-1 py-1 shadow-smd ring-1 ring-slate-200 " +
        className
      }
    >
      <div className="flex items-center justify-between">
        <UserItem userId={user?.uid}></UserItem>
        <InputPrivacy
          onInput={(privacy) => set({ privacy })}
          defaultValue={settings?.seeFuturePost}
        />
      </div>
      <div className="flex items-center flex-1">
        <textarea
          onKeyUp={toolAutoGrow}
          value={body}
          onChange={(e) => set({ body: e.target.value })}
          placeholder="Write Something..."
          className="flex-1 resize-none px-2 ring-1d text-gray-500 dark:text-gray-200 bg-transparent text-sm max-h-[300px]"
        />
      </div>
      <div className="flex items-center justify-end px-1 text-gray-500 gap-2">
        <ImgInput set={set}>
          <Image src="/img/image.png" height={29} width={29} />
        </ImgInput>
        <ImgInput set={set}>
          <Image src="/img/video.png" height={29} width={29} />
        </ImgInput>

        <ButtonPrimary
          onClick={onPost}
          active="true"
          className="text-sm mx-1 mt-0 mb-1"
        >
          post
        </ButtonPrimary>
      </div>
      <ImgEditor imgs={imgs} set={set} />
      <Modal open={loading}>
        <Box>please wait ...</Box>
      </Modal>
    </Box>
  );
}
