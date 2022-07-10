import { useState } from "react";
import useReaction from "../../controls/useReaction";
import useUser from "../../controls/useUser";
import Icon from "../elements/Icon";
import UsersListPop from "../user/UsersListPop";

export default function LikeMain({
  docId,
  docUserId,
  likes = [],
  loves = [],
  col_,
  size,
  className,
  likeActiveStyle = "text-indigo-300",
  loveActiveStyle = "text-pink-300",
  likeFill,
  loveFill,
  likeClass,
  loveClass,
}) {
  const { user } = useUser();
  const { like, love } = useReaction();
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

  return (
    <div className={" flex items-center text-gray-500 max-w-min " + className}>
      <div
        onMouseEnter={(_) => {
          setOpen(false);
          setShow(true);
        }}
        onMouseLeave={(_) => {
          setShow(false);
          setOpen(false);
        }}
      >
        <button
          onMouseEnter={openLike}
          onMouseLeave={(_) => setOpen(false)}
          className="flex items-center min-w-[50px] py-0 my-0"
          onClick={(_) => like(docId, user?.uid, likes, col_, docUserId)}
        >
          <UsersListPop
            show={show}
            par="top-5"
            users={likes}
            open={open}
            set={setOpen}
            text="Likers"
          />

          <Icon
            size={size}
            active={likes?.find((i) => i == user?.uid)}
            activeStyle={likeActiveStyle}
            fill={likeFill}
            className={likeClass}
          >
            thumb-up
          </Icon>
          <small>{likes?.length || ""}</small>
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
          onClick={(_) => love(docId, user?.uid, loves, col_, docUserId)}
        >
          <UsersListPop
            show={showL}
            par="top-5"
            users={loves}
            open={openL}
            set={setOpenL}
            text="Lovers"
          />
          <Icon
            size={size}
            active={loves?.find((i) => i == user?.uid)}
            activeStyle={loveActiveStyle}
            fill={loveFill}
            className={loveClass}
          >
            heart
          </Icon>
          <small>{loves?.length || ""}</small>
        </button>
      </div>
    </div>
  );
}
