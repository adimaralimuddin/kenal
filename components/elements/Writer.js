import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import toolSnapToDoc from "../../controls/toolSnapToDoc";
import toolUpdatedoc from "../../controls/toolUpdateDoc";
import useUser from "../../controls/useUser";
import { db } from "../../firebase.config";
import { useAlert } from "./Alert";
import Avatar from "./Avatar";
import Icon from "./Icon";
import ImgEditor from "./ImgEditor";
import ImgInput from "./ImgInput";

export default function Writer({
  converse,
  text = "post",
  onPost,
  single,
  small,
  div,
  onPostCaller,
  replyTo,
  className,
  autoFocus = true,
  allowImages = true,
  setOpen,
  // userProfile,
  onInput,
  onTyping,
  onDoneTyping,
}) {
  const { user, userProfile } = useUser();
  const [body, setBody] = useState("");
  const [imgs, setImgs] = useState({ imgs: [] });
  const [replyTo_, setReplyTo] = useState(replyTo);
  const [uploading, setUploading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { open } = useAlert();
  const [writer, setWriter] = useState({ typers: [] });
  const textAreaRef = useRef(null);

  // console.log("writer eff");

  useEffect(() => {
    if (!converse?.id) return;
    const q = query(doc(db, "writer", converse?.id));
    const unsub = onSnapshot(q, (snap) => {
      const docSnap = toolSnapToDoc(snap);
      setWriter(docSnap);
    });
    return () => unsub();
  }, [converse]);

  useEffect(() => {
    if (body === "") {
      // textAreaRef.current.focus();
    }
  });

  useEffect(() => {
    if (!user || !converse) return;
    const unsub = setTimeout(() => {
      setIsTyping(false);
      toolUpdatedoc("writer", converse?.id, {
        typers: arrayRemove({ name: userProfile?.displayName, id: user?.uid }),
      });
      onDoneTyping && onDoneTyping(body);
    }, [2000]);
    return () => clearTimeout(unsub);
  }, [body]);

  function onTypingHandler(value) {
    if (!converse) return;
    if (!isTyping) {
      toolUpdatedoc("writer", converse?.id, {
        typers: arrayUnion({ name: userProfile.displayName, id: user.uid }),
      });
      onTyping && onTyping(value);
    }
    setIsTyping(true);
  }

  const handlePost = (cb) => {
    setIsTyping(false);
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
    onPost(data, () => {
      clear();
      cb && typeof cb === "function" && cb();
    });
    onPostCaller?.();
  };

  function clear() {
    setImgs({ imgs: [] });
    setBody("");
    setUploading(false);
  }

  function onKeyEnter(e) {
    if (e.code === "Enter" && e.target?.value?.trim() !== "") {
      e.target.value = "";
      handlePost(() => {
        setBody("");
        setReplyTo(null);
      });
    }
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
  const isTyping_ = () => writer?.typers?.find((u) => u?.id !== user.uid);

  return (
    <div className={"flex flex-col  " + className}>
      <span className="relative">
        {isTyping_() && (
          <div className="absolute animate-pulse box left-2 bottom-8 flex-row w-[100px]d box-shadow ">
            <small className="whitespace-nowrap">
              {converse?.type === "private" ? isTyping_()?.name : "someone"} is
              typing...
            </small>
          </div>
        )}
      </span>

      <div className={"flex items-center  p-1 " + div}>
        <Avatar
          size={small ? 30 : 35}
          src={userProfile?.photoURL}
          userName={user?.userName || user?.email}
        />
        <div className="bg-slate-100 dark:bg-slate-700 ring-1 ring-slate-200 dark:ring-slate-700 flex items-center flex-1 p-[1px] rounded-3xl ">
          <textarea
            ref={textAreaRef}
            // autoFocus={true}
            autoFocus={autoFocus}
            value={body}
            onInput={(e) => {
              const value = e.target?.value;
              setBody(value);
              onTypingHandler(value);
              onInput && onInput(value);
            }}
            defaultValue={replyTo_ && "@" + replyTo_?.[1] + " "}
            onKeyDown={onKeyEnter}
            onKeyUp={auto_grow}
            onFocus={(e) => {
              e.target.selectionStart = e.target.value.length;
            }}
            className=" w-full min-w-[10px] flex h-[34px] ring-1d items-center justify-center min-h-[30px] resize-none ring-d1 max-h-[150px] overflow-y-auto flex-1 my-0 text-sm bg-transparent py-[7px] px-2"
            placeholder={"Write a " + text + " ..."}
          />
          <div className="flex gap-1 px-2 text-slate-500">
            {allowImages && (
              <ImgInput single={single} set={setImgs}>
                <Icon className="text-slate-500">image-add</Icon>
              </ImgInput>
            )}
          </div>
        </div>
        <i
          onClick={handlePost}
          className="ri-send-plane-fill text-primary-light text-2xl px-2 cursor-pointer"
        ></i>
      </div>
      {!uploading && (
        <div>
          <ImgEditor imgs={imgs?.imgs} set={setImgs} />
        </div>
      )}
    </div>
  );
}
