import { useEffect, useState } from "react";
import Box from "../elements/Box";
import ButtonPrim from "../elements/ButtonPrim";
import IconBtn from "../elements/IconBtn";
import ImgEditor from "../elements/ImgEditor";

export default function PostEditorMain({ data, onUpdate, open, setOpen }) {
  const [body, setBody] = useState(data?.body);
  const [imgs, setImgs] = useState({ imgs: data?.images });

  useEffect(() => {
    setImgs({ imgs: data?.images });
    setBody(data?.body);
  }, [data]);

  const onUpdateHandler = () => {
    onUpdate(data?.body, body, imgs?.imgs || [], data?.id);
    setOpen(false);
  };

  const reset = () => {
    setBody(data?.body);
    setImgs({ imgs: data?.images });
  };

  if (!open) return null;

  return (
    <div
      onClick={(_) => setOpen(false)}
      className=" flex flex-col items-center justify-center fixed top-0 left-0 bg-gray-900 w-full h-full z-50 bg-opacity-80 backdrop-blur-lg"
    >
      <Box
        className="relative w-full max-w-sm p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <IconBtn
          onClick={(_) => setOpen(false)}
          className="bg-white -right-5 absolute -top-5 "
        >
          close
        </IconBtn>
        <input
          autoFocus="on"
          onFocus={(e) => e.target.select()}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="ring-1 flex-1 w-full"
        />
        <ImgEditor imgs={imgs?.imgs} set={setImgs} />
        <div className="flex items-center justify-between">
          <IconBtn onClick={reset}>refresh</IconBtn>
          <ButtonPrim onClick={onUpdateHandler}>Update</ButtonPrim>
        </div>
      </Box>
    </div>
  );
}
