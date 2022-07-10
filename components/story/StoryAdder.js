import useStory from "../../controls/useStory";
import Icon from "../elements/Icon";
import Writer from "../elements/Writer";
import useUser from "../../controls/useUser";
import { useState } from "react";
import Box from "../elements/Box";
import Modal from "../elements/Modal";

export default function StoryAdder({}) {
  const { addStory } = useStory();
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div
        style={{ backgroundImage: "url('img/storybg.webp')" }}
        className=" flex-1 bg-cover bg-no-repeat bg-centerd flex flex-col items-center justify-end rounded-lg  h-full min-w-[100px]d max-w-[100px]d  bg-orange-400d  text-white py-2 mx-1 "
      >
        <button
          onClick={(_) => setOpen(true)}
          className="ring-[3px] mb-3 ring-white p-1 text-white "
        >
          <Icon className=" text-white ">add</Icon>
        </button>
        <button>Add Story</button>
      </div>
      <Modal set={setOpen} open={open}>
        <Box className="">
          <Writer
            // single="true"
            text={"story"}
            onPost={(data, clear) => {
              addStory(data, clear);
              setOpen(false);
            }}
            user={user}
          />
        </Box>
      </Modal>
    </div>
  );
}
