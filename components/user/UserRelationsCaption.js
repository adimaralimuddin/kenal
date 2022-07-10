import { useState } from "react";
import Box from "../elements/Box";
import Modal from "../elements/Modal";
import UserItem from "./UserItem";

export default function UserRelationsCaption({ relation, postsLength }) {
  return (
    <div className="flex items-center pb-2 justify-between text-gray-500 mx-auto w-full max-w-lg pt-3">
      <div className="flex flex-col text-center flex-1 cursor-pointer  hover:underline">
        <p>{postsLength}</p>
        <p>Posts</p>
      </div>
      <Item data={relation?.followers} text="Followers" />
      <Item data={relation?.followings} text="Followings" />
    </div>
  );
}

function Item({ data, text }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={(_) => setOpen((p) => !p)}
      className="flex flex-col text-center flex-1 cursor-pointer  hover:underline"
    >
      <p>{data?.length || 0}</p>
      <p>{text}</p>
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
              <UserItem userId={userId} />
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
