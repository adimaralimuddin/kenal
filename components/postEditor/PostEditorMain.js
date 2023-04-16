import Image from "next/image";
import { useEffect, useState } from "react";
import Box from "../elements/Box";
import ButtonPrim from "../elements/ButtonPrim";
import Icon from "../elements/Icon";
import IconBtn from "../elements/IconBtn";
import ImgEditor from "../elements/ImgEditor";
import ImgInput from "../elements/ImgInput";
import InputPrivacy from "../elements/InputPrivacy";
import Modal from "../elements/Modal";
import TextArea from "../elements/TextArea";

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
    await onUpdate({
      prev: data?.body,
      body,
      images: imgs?.imgs || [],
      docId: data?.id,
      imgLength: data?.img?.idLength,
      privacy,
    });
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
    <Modal
      open={open}
      set={setOpen}
      // onClick={(_) => setOpen(false)}
      // className=" flex flex-col  fixed top-0 left-0 bg-gray-900 w-full h-full z-30 bg-opacity-80 backdrop-blur-lg"
    >
      <div
        className="relative box flex-col flex p-[4%] gap-2 "
        onClick={(e) => e.stopPropagation()}
      >
        <header>
          <h2 className="text-h2">Editing post</h2>
        </header>

        <div className="ring-1d flex  flex-1 w-full text-semibold text-slate-500 bg-slate-100 dark:text-slate-200 rounded-lg overflow-hidden ">
          <TextArea
            autoFocus={true}
            onChange={(e) => setBody(e.target.value)}
            value={body}
          />
          {/* <p className="flex items-center  px-1"> */}
          <IconBtn
            className="rounded-none bg-transparent dark:bg-transparent flex items-center justify-center"
            onClick={() => setBody(data?.body)}
          >
            refresh
          </IconBtn>
          {/* </p> */}
        </div>
        <div className="flex">
          <InputPrivacy onInput={setPrivacy} defaultValue={data?.privacy} />
        </div>
        <div>
          <h1 className="px-1 text-slate-600 font-semibold">post images</h1>
          <ImgEditor imgs={imgs?.imgs} set={setImgs} onSet={onSet} />
        </div>
        <div className="flex items-center gap-3 justify-between flex-wrap">
          <IconBtn
            className="mr-auto"
            onClick={() => setImgs({ imgs: data?.images })}
          >
            refresh
          </IconBtn>
          <ImgInput onInput={onSet} dset={setImgs}>
            <Icon className="text-3xl">image-add</Icon>
          </ImgInput>
          <button className="btn-prime px-6 " onClick={onUpdateHandler}>
            Update
          </button>
          {/* <ButtonPrim onClick={onUpdateHandler}>Update</ButtonPrim> */}
        </div>
      </div>
    </Modal>
  );
}
