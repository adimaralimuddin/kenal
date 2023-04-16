import { useEffect, useState } from "react";
import useSettings from "../../controls/useSettings";
import useStory from "../../controls/useStory";
import useUser from "../../controls/useUser";
import { useAlert } from "../elements/Alert";
import Box from "../elements/Box";
import Icon from "../elements/Icon";
import InputPrivacy from "../elements/InputPrivacy";
import Modal from "../elements/Modal";
import Writer from "../elements/Writer";

export default function StoryAdder({}) {
  const { settings } = useSettings();

  const { addStory } = useStory();
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const { open: openAlert, pop } = useAlert();
  const [privacy, setPrivacy] = useState(settings?.seeOtherStories);

  useEffect(() => {
    setPrivacy(settings?.seeOtherStories);
  }, [open]);

  const onAddStory = (data, clear) => {
    if (!user) {
      return openAlert("you must signin to write a story.");
    }
    openAlert("Posting story . . . ", true);
    addStory({ ...data, privacy }, () => {
      clear();
      pop("Story added!", "check");
    });
    setOpen(false);
  };

  return (
    <div className="z-10 sticky left-0 flex-1 max-w-[110px] min-w-[100px]">
      <div className="flex-1 bg-gradient-to-b from-[#c899fb] to-[#8a8ae2]  flex flex-col items-center text-center justify-end rounded-xl  h-full   text-white py-2 ">
        <button
          onClick={(_) => setOpen(true)}
          className="ring-[2px] bg-whited mb-1 ring-white p-[3px] text-white "
        >
          <Icon className=" text-primary-light text-sm  bg-white rounded-lg  w-[30px] h-[30px]">
            add
          </Icon>
        </button>
        <button className="font-semibold text-sm">Add Story</button>
      </div>
      <Modal set={setOpen} open={open} div=" z-0 " className={" z-10 "}>
        <Box className="z-10">
          <div className="flex pb-2">
            <InputPrivacy
              defaultValue={settings?.seeOtherStories}
              onInput={setPrivacy}
            />
          </div>
          <Writer onPost={onAddStory} user={user} setOpen={setOpen} />
        </Box>
      </Modal>
    </div>
  );
}
