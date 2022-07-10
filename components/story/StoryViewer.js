import Modal from "../elements/Modal";
import Box from "../elements/Box";
import Option from "../elements/Option";
import Image from "next/image";
import UserItem from "../user/UserItem";
import LikeMain from "../reactions/LikeMain";

export default function StoryViewer({ open, setOpen, data, onRemove }) {
  const options = [
    {
      text: "delete",
      action: () => onRemove(data?.id),
    },
  ];

  return (
    <div>
      <Modal open={open} set={setOpen}>
        <Box className="w-[100vw] text-gray-500 flex flex-col h-[100vw] max-w-lg max-h-[80vh]">
          <div className="flex items-center justify-between">
            <UserItem userId={data?.userId} />
            <Option options={options} />
          </div>
          <p className="p-2 text-start">{data?.body}</p>
          <div className="relative flex-1">
            {data?.images?.length > 0 && (
              <Image
                src={data?.images?.[0]?.url}
                layout="fill"
                objectFit="contain"
              />
            )}
          </div>
          <div>
            <LikeMain
              userId={data?.userId}
              docId={data?.id}
              likes={data?.likes}
              loves={data?.loves}
              col_="stories"
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
