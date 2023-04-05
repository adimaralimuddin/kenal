import Image from "next/image";
import { useState } from "react";
import usePost from "../../controls/usePost";
import useSettings from "../../controls/useSettings";
import useUser from "../../controls/useUser";
import { toolAutoGrow } from "../../tools/toolUi";
import { useAlert } from "../elements/Alert";
import Avatar from "../elements/Avatar";
import Box from "../elements/Box";
import ButtonPrimary from "../elements/ButtonPrim";
import Icon from "../elements/Icon";
import ImgEditor from "../elements/ImgEditor";
import ImgInput from "../elements/ImgInput";
import InputPrivacy from "../elements/InputPrivacy";
import Modal from "../elements/Modal";
import UserItem from "../user/UserItem";

export default function PostAdder({ className, to }) {
  const { user, userProfile, ...xxx } = useUser();
  const { settings } = useSettings();
  const { set, body, addPost, imgs, loading, vids, uploadVids } = usePost();
  const { open, pop } = useAlert();
  const [isOpen, setIsOpen] = useState(false);
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
        setIsOpen(false);
        pop("Post Added!", "check", 1);
      }
    });
  };

  if (!user) return null;

  return (
    <div className={" " + className}>
      <div
        className="box p-2 flex items-center"
        onClick={() => setIsOpen(true)}
      >
        <UserItem userId={user?.uid} noName={true} />
        {/* <Avatar size={30} src={userProfile?.photoURL} /> */}
        <p className="text-slate-500 dark:text-slate-200 px-2">
          anything on your mind?
        </p>
        {/* <input
          className="flex-1 h-full max-h-full"
          onFocus={() => setIsOpen(true)}
          type="text"
        /> */}
      </div>
      <Modal open={isOpen} set={setIsOpen}>
        <div className="box flex-1 p-6 flex flex-col">
          <div className="flex items-center justify-between">
            <UserItem userId={user?.uid}></UserItem>
            <InputPrivacy
              onInput={(privacy) => set({ privacy })}
              defaultValue={settings?.seeFuturePost}
            />
          </div>
          <div className="flex flex-1 flex-col py-3">
            <textarea
              onKeyUp={toolAutoGrow}
              value={body}
              onChange={(e) => set({ body: e.target.value })}
              placeholder="Write Something..."
              className="flex-1 resize-none px-2 ring-1d text-gray-500 dark:text-gray-200 bg-transparent text-xl font-medium max-h-[300px]"
            />
          </div>
          <div className="flex text-[1.5rem] items-center justify-end px-1 text-gray-500 gap-4">
            <ImgInput set={set}>
              <Icon>image-add</Icon>
              {/* <Image src="/img/image.png" height={29} width={29} /> */}
            </ImgInput>
            <ImgInput set={set}>
              <Icon>video-add</Icon>
              {/* <Image src="/img/video.png" height={29} width={29} /> */}
            </ImgInput>
            <button onClick={onPost} className="btn-prime font-medium text-lg">
              Post It!
            </button>
          </div>
          <ImgEditor imgs={imgs} set={set} />
        </div>
      </Modal>
      <Modal open={loading}>
        <Box>please wait ...</Box>
      </Modal>
    </div>
  );
}
