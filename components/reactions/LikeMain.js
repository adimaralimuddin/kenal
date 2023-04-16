import { useState } from "react";
import useReaction from "../../controls/useReaction";
import useUser from "../../controls/useUser";
import { useAlert } from "../elements/Alert";
import Icon from "../elements/Icon";
import UsersListPop from "../user/UsersListPop";

export default function LikeMain({
  postId,
  data,
  col_,
  size,
  className,
  likeActiveStyle = " text-indigo-300 dark:indigo-400 ",
  loveActiveStyle = "text-pink-300",
  likeFill,
  loveFill,
  likeClass,
  loveClass,
  noIcon,
  noNotif = false,
}) {
  const { user } = useUser();
  const { like, love } = useReaction();
  const { open: openAlert } = useAlert();

  const [open, setOpen] = useState(false);
  const [openL, setOpenL] = useState(false);
  const [show, setShow] = useState(false);
  const [showL, setShowL] = useState(false);

  function openLike() {
    setTimeout(() => {
      setOpen(true);
    }, 500);
  }

  function openLove() {
    setTimeout(() => {
      setOpenL(true);
    }, 500);
  }

  function alertNoUser(val = "like") {
    return openAlert(`Please signin to ${val} this post.`);
  }

  function onLikeHandler() {
    if (!user) {
      return alertNoUser();
    }
    // console.log("to like data: ", data);
    like(
      {
        docId: data.id,
        postId,
        authId: user?.uid,
        likes: data?.likes,
        col_,
        docUserId: Array.isArray(data?.userId)
          ? data?.userId?.[0]
          : data?.userId,
        text: data?.body,
      },
      noNotif
    );
  }

  function onLoveHandler() {
    if (!user) {
      return alertNoUser("love");
    }
    love(
      {
        docId: data?.id,
        postId,
        authId: user?.uid,
        loves: data?.loves,
        col_,
        docUserId: Array.isArray(data?.userId)
          ? data?.userId?.[0]
          : data?.userId,
        text: data?.body,
      },
      noNotif
    );
  }

  return (
    <div className={" flex items-center text-gray-500 max-w-min " + className}>
      <div
        onMouseEnter={() => {
          setOpen(false);
          setShow(true);
        }}
        onMouseLeave={() => {
          setShow(false);
          setOpen(false);
        }}
      >
        <button
          onMouseEnter={openLike}
          onMouseLeave={() => setOpen(false)}
          className="flex items-center min-w-[50px] py-0 my-0"
          onClick={onLikeHandler}
        >
          <UsersListPop
            show={show}
            par="top-5"
            users={data?.likes}
            open={open}
            set={setOpen}
            text="Likers"
          />
          {noIcon && (
            <small
              className={
                "hover:underline dark:text-slate-400 hover:text-blue-400 " +
                (data?.likes?.find((i) => i == user?.uid) &&
                  "text-blue-400 dark:text-blue-300")
              }
            >
              like
            </small>
          )}
          {!noIcon && (
            <Icon
              size={size}
              active={data?.likes?.find((i) => i == user?.uid)}
              activeStyle={likeActiveStyle}
              fill={likeFill}
              className={likeClass}
            >
              thumb-up
            </Icon>
          )}
          <small className="whitespace-nowrap pl-1">
            {data?.likes?.length ? `(${data?.likes?.length})` : ""}
          </small>
        </button>
      </div>
      <div
        onMouseEnter={(_) => {
          setOpenL(false);
          setShowL(true);
        }}
        onMouseLeave={(_) => {
          setShowL(false);
          setOpenL(false);
        }}
      >
        <button
          onMouseEnter={openLove}
          onMouseLeave={(_) => setOpenL(false)}
          className="flex items-center min-w-[50px] py-0 my-0"
          onClick={onLoveHandler}
        >
          <UsersListPop
            show={showL}
            par="top-5"
            users={data?.loves}
            open={openL}
            set={setOpenL}
            text="Lovers"
          />
          {noIcon && (
            <small
              className={
                "active:scale-110 dark:text-slate-400 hover:underline hover:text-pink-400 " +
                (data?.loves?.find((i) => i == user?.uid) &&
                  " text-pink-400 dark:text-pink-400  ")
              }
            >
              love
            </small>
          )}
          {!noIcon && (
            <Icon
              size={size}
              active={data?.loves?.find((i) => i == user?.uid)}
              activeStyle={loveActiveStyle}
              fill={loveFill}
              className={loveClass}
            >
              heart
            </Icon>
          )}
          <small className="whitespace-nowrap pl-1 ">
            {data?.loves?.length ? `(${data?.loves?.length})` : ""}
          </small>
        </button>
      </div>
    </div>
  );
}
