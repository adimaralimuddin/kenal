import useStory from "../../controls/useStory";
import Icon from "../elements/Icon";
import Writer from "../elements/Writer";
import useUser from "../../controls/useUser";
import { useEffect, useState } from "react";
import Box from "../elements/Box";
import Modal from "../elements/Modal";
import { useAlert } from "../elements/Alert";
import InputPrivacy from "../elements/InputPrivacy";
import useSettings from "../../controls/useSettings";

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
    <div>
      <div
        style={{ backgroundImage: "url('img/storybg1.webp')" }}
        className="ring-2 ring-transparent hover:ring-pink-300 flex-1 bg-cover bg-no-repeat bg-centerd flex flex-col items-center text-center justify-end rounded-lg  h-full min-w-[90px]   bg-orange-400d  text-white py-2 mx-1 "
      >
        <button
          onClick={(_) => setOpen(true)}
          className="ring-[3px] mb-3 ring-white p-1 text-white "
        >
          <Icon className=" text-white dark:text-white">add</Icon>
        </button>
        <button>Add Story</button>
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
