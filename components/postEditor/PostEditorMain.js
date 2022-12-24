import Image from "next/image";
import { useEffect, useState } from "react";
import Box from "../elements/Box";
import ButtonPrim from "../elements/ButtonPrim";
import IconBtn from "../elements/IconBtn";
import ImgEditor from "../elements/ImgEditor";
import ImgInput from "../elements/ImgInput";
import TextArea from "../elements/TextArea";
import InputPrivacy from "../elements/InputPrivacy";

export default function PostEditorMain({ data, onUpdate, open, setOpen }) {
  const [body, setBody] = useState(data?.body);
  const [imgs, setImgs] = useState({ imgs: data?.images || [] });
  const [privacy, setPrivacy] = useState(data?.privacy);

  useEffect(() => {
    setImgs({ imgs: data?.images });
    setBody(data?.body);
    setPrivacy(data?.privacy);
  }, [data]);

  const onUpdateHandler = async () => {
    setOpen(false);
    await onUpdate(
      data?.body,
      body,
      imgs?.imgs || [],
      data,
      data?.img?.idLength,
      privacy
    );
  };

  // const reset = () => {
  //   setBody(data?.body);
  //   setImgs({ imgs: data?.images || [] });
  // };

  const onSet = (files) => {
    setImgs((p) =>
      p?.imgs ? { imgs: [...p?.imgs, ...files] } : { imgs: files }
    );
  };

  if (!open) return null;

  return (
    <div
      onClick={(_) => setOpen(false)}
      className=" flex flex-col items-center justify-center fixed top-0 left-0 bg-gray-900 w-full h-full z-30 bg-opacity-80 backdrop-blur-lg"
    >
      <Box
        className="relative w-full max-w-sm p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-lg front-semibold">Editing post</h1>
          <InputPrivacy onInput={setPrivacy} defaultValue={data?.privacy} />
        </div>
        <IconBtn
          onClick={(_) => setOpen(false)}
          className="bg-white -right-5 absolute -top-5 "
        >
          close
        </IconBtn>
        <div className="ring-1 flex  flex-1 w-full text-slate-500 dark:text-slate-200 rounded-lg overflow-hidden ring-d2 my-2 ">
          <TextArea onChange={(e) => setBody(e.target.value)} value={body} />
          <p className="flex items-center bg-d2 px-1">
            <IconBtn
              className="rounded-none bg-transparent dark:bg-transparent "
              onClick={() => setBody(data?.body)}
            >
              refresh
            </IconBtn>
          </p>
        </div>

        <ImgEditor imgs={imgs?.imgs} set={setImgs} onSet={onSet} />
        <div className="flex items-center gap-3 justify-between">
          <IconBtn
            className="mr-auto"
            onClick={() => setImgs({ imgs: data?.images })}
          >
            refresh
          </IconBtn>
          <ImgInput onInput={onSet} dset={setImgs}>
            <Image
              src="/img/gallery.png"
              height={29}
              width={29}
              className="mx-2"
            />
          </ImgInput>
          <ButtonPrim onClick={onUpdateHandler}>Update</ButtonPrim>
        </div>
      </Box>
    </div>
  );
}
