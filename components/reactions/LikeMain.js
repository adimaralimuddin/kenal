import { useState } from "react";
import useReaction from "../../controls/useReaction";
import useUser from "../../controls/useUser";
import { useAlert } from "../elements/Alert";
import Icon from "../elements/Icon";
import UsersListPop from "../user/UsersListPop";

export default function LikeMain({
  data,
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
          onClick={(_) => {
            if (!user) {
              return alertNoUser();
            }
            like(
              data?.id,
              user?.uid,
              data?.likes,
              col_,
              Array.isArray(data?.userId) ? data?.userId?.[0] : data?.userId
            );
          }}
        >
          <UsersListPop
            show={show}
            par="top-5"
            users={data?.likes}
            open={open}
            set={setOpen}
            text="Likers"
          />

          <Icon
            size={size}
            active={data?.likes?.find((i) => i == user?.uid)}
            activeStyle={likeActiveStyle}
            fill={likeFill}
            className={likeClass}
          >
            thumb-up
          </Icon>
          <small>{data?.likes?.length || ""}</small>
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
          onClick={(_) => {
            if (!user) {
              return alertNoUser("love");
            }
            love(
              data?.id,
              user?.uid,
              data?.loves,
              col_,
              // data?.userId?.[0] || data?.userId
              Array.isArray(data?.userId) ? data?.userId?.[0] : data?.userId
              // Array.isArray(data?.userId) ? data?.userId?.[0] : data?.userId
            );
          }}
        >
          <UsersListPop
            show={showL}
            par="top-5"
            users={data?.loves}
            open={openL}
            set={setOpenL}
            text="Lovers"
          />
          <Icon
            size={size}
            active={data?.loves?.find((i) => i == user?.uid)}
            activeStyle={loveActiveStyle}
            fill={loveFill}
            className={loveClass}
          >
            heart
          </Icon>
          <small>{data?.loves?.length || ""}</small>
        </button>
      </div>
    </div>
  );
}
