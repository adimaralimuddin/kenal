import { useState } from "react";
import useRelations from "../../controls/useRelations";
import Box from "../elements/Box";
import Modal from "../elements/Modal";
import UserItem from "./UserItem";

export default function UserRelationsCaption({
  userId,
  relation,
  postsLength,
  authId,
  noPost = false,
}) {
  const { showFollowings, showFollowers } = useRelations();
  // return null;
  if (!userId || !authId || !relation) return null;

  return (
    <div className="flex items-center justify-center px-3 text-gray-500 dark:text-gray-500 mx-auto w-full max-w-lg  flex-wrap gap-x-2 ">
      {!noPost && (
        <div className="flex gap-2 text-center flex-1 cursor-pointer  hover:underline">
          <p>{postsLength}</p>
          <p>Posts</p>
        </div>
      )}
      <Item
        key="followers"
        data={relation?.followers}
        show={showFollowers}
        text="Followers"
        authId={authId}
        userId={userId}
      />
      <Item
        key="followings"
        data={relation?.followings}
        show={showFollowings}
        text="Followings"
        authId={authId}
        userId={userId}
      />
    </div>
  );
}

function Item({ data, text, show, authId, userId }) {
  const [open, setOpen] = useState(false);
  if (!show && authId !== userId) return null;

  return (
    <div
      onClick={(_) => setOpen((p) => !p)}
      className="flex flex-col text-center flex-1 cursor-pointer  hover:underline  animate-pop pb-2"
    >
      <div className="flex gap-2 items-center justify-center ring-1d">
        <h3 className="font-semibold text-medium">{data?.length || 0}</h3>
        <p>{text}</p>
      </div>
      <Modal
        open={open}
        set={setOpen}
        par="bg-red-400 ring-1"
        div=" w-full max-w-md"
      >
        <Box className="flex min-h-[200px] flex-col py-0 px-0">
          <h3 className=" text-lg p-3">{text}</h3>
          <hr />
          <div className="px-2">
            {data?.map((userId) => (
              <UserItem userId={userId} key={userId} />
            ))}
          </div>
          {(data?.length <= 0 || !data) && (
            <div className="text-gray-400 flex flex-col items-center justify-center flex-1">
              No {text} yet!
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
