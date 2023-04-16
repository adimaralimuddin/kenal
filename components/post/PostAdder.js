import { useRef, useState } from "react";
import usePost from "../../controls/usePost";
import useSettings from "../../controls/useSettings";
import useUser from "../../controls/useUser";
import { toolAutoGrow } from "../../tools/toolUi";
import { useAlert } from "../elements/Alert";
import Icon from "../elements/Icon";
import ImgEditor from "../elements/ImgEditor";
import ImgInput from "../elements/ImgInput";
import InputPrivacy from "../elements/InputPrivacy";
import Modal from "../elements/Modal";
import UserItem from "../user/UserItem";

export default function PostAdder({ className, to }) {
  const { user, userProfile } = useUser();
  const { settings } = useSettings();
  const { set, addPost, imgs, loading, vids } = usePost();
  const { open, pop } = useAlert();
  const [isOpen, setIsOpen] = useState(false);
  const bodyRef = useRef(null);

  const onPost = () => {
    const body = bodyRef?.current?.value;
    if (!body) return;
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

    addPost(to !== user?.uid && to, body, () => {
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
        <p className="text-slate-600 dark:text-slate-400 font-medium px-2">
          Anything On Your Mind?
        </p>
      </div>
      <Modal open={isOpen} set={setIsOpen}>
        <div className="box flex-1 p-6 flex flex-col">
          <div className="flex items-center justify-between flex-wrap">
            <UserItem userId={user?.uid}></UserItem>
            <InputPrivacy
              onInput={(privacy) => set({ privacy })}
              defaultValue={settings?.seeFuturePost}
            />
          </div>
          <div className="flex flex-1 flex-col py-3">
            <textarea
              ref={bodyRef}
              onKeyUp={toolAutoGrow}
              autoFocus={true}
              placeholder="Write Something..."
              className="flex-1 resize-none px-2 ring-1d text-slate-600 dark:text-gray-200 bg-transparent text-lg font-medium max-h-[300px]"
            />
          </div>
          <div className="flex text-[1.5rem] items-center justify-end px-1 text-gray-500 gap-4 flex-wrap">
            <ImgInput set={set}>
              <Icon>video-add</Icon>
            </ImgInput>
            <ImgInput set={set}>
              <Icon>image-add</Icon>
            </ImgInput>
            <button
              onClick={onPost}
              className="btn-prime whitespace-nowrap font-medium text-lg px-6"
            >
              Post It!
            </button>
          </div>
          <ImgEditor imgs={imgs} set={set} />
        </div>
      </Modal>
      <Modal open={loading}>
        <div className="box">please wait ...</div>
      </Modal>
    </div>
  );
}
