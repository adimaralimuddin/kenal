import Icon from "./Icon";
import Avatar from "./Avatar";
import { useState } from "react";
import ImgInput from "./ImgInput";
import ImgEditor from "./ImgEditor";
import useUser from "../../controls/useUser";
import { useAlert } from "./Alert";

export default function Writer({
  text = "post",
  onPost,
  user,
  single,
  small,
  div,
  onPostCaller,
  replyTo,
  className,
  autoFocus = true,
  allowImages = true,
  setOpen,
}) {
  const [body, setBody] = useState("");
  const [imgs, setImgs] = useState({ imgs: [] });
  const [replyTo_, setReplyTo] = useState(replyTo);
  const [uploading, setUploading] = useState(false);
  const { open } = useAlert();

  const handlePost = () => {
    if (!user) {
      setOpen?.(false);
      return open("you must signin to post.");
    }

    const data = {
      body: body?.replace("@" + replyTo?.[1] + " ", ""),
      imgs: imgs?.imgs,
    };

    if (replyTo) {
      data.replyTo = replyTo;
    }
    setUploading(true);
    onPost(data, clear);
    onPostCaller?.();
  };

  function clear() {
    setImgs({ imgs: [] });
    setBody("");
    setUploading(false);
  }

  function onKeyEnter(e) {
    if (
      e.code == "Backspace" &&
      e.target.value == "@" + replyTo?.[1] + " " &&
      replyTo
    ) {
      setReplyTo(null);
      setBody("");
    }
  }

  function auto_grow(e) {
    e.target.style.height = "5px";
    e.target.style.height = e.target.scrollHeight + "px";
  }

  return (
    <div className={className}>
      <div className={"flex w-full items-center flex-wrap " + div}>
        <Avatar
          size={small ? 30 : 35}
          src={user?.photoURL}
          userName={user?.userName || user?.email}
        />
        <textarea
          autoFocus={autoFocus}
          value={body}
          onInput={(e) => setBody(e.target?.value)}
          defaultValue={replyTo_ && "@" + replyTo_?.[1] + " "}
          onKeyDown={onKeyEnter}
          onKeyUp={auto_grow}
          onFocus={(e) => {
            e.target.selectionStart = e.target.value.length;
          }}
          className=" min-w-[10px] flex h-[34px] ring-1d items-center justify-center min-h-[30px] resize-none ring-d1 max-h-[150px] overflow-y-auto flex-1 my-0 text-sm bg-transparent py-[7px] px-2"
          placeholder={"Write a " + text + " ..."}
        />
        {allowImages && (
          <ImgInput single={single} set={setImgs}>
            <button className=" flex items-center">
              <Icon>image-add</Icon>
            </button>
          </ImgInput>
        )}
        <button className=" flex items-center" onClick={handlePost}>
          <Icon>reply</Icon>
        </button>
      </div>
      {!uploading && (
        <div>
          <ImgEditor imgs={imgs?.imgs} set={setImgs} />
        </div>
      )}
    </div>
  );
}
