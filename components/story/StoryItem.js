import { useState } from "react";
import UserItem from "../user/UserItem";
import StoryViewer from "./StoryViewer";

export default function StoryItem({ data, onRemove }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={(_) => setOpen(true)}
      style={{
        backgroundImage: `url("${
          data?.images?.[0]?.url || "/img/storybg.webp"
        }")`,
      }}
      className="flex-1 ring-2 ring-pink-200 cursor-pointer overflow-hidden bg-center bg-cover bg-no-repeat text-white p-1 flex flex-col  justify-between items-center content-center text-center rounded-xl h-full min-w-[100px]d max-w-[100px]d mx-1 relative"
    >
      <UserItem
        pop={false}
        className={"m-0 p-0 z-10"}
        userId={data?.userId}
        noName="on"
        small="on"
      />
      <small className="absolute top-0 left-0 h-full bg-gray-900  bg-opacity-30 w-full flex-1 overflow-y-clip px-2 flex flex-col items-center justify-center">
        {data?.body}
      </small>
      <StoryViewer
        setOpen={setOpen}
        open={open}
        data={data}
        onRemove={onRemove}
      />
    </div>
  );
}
