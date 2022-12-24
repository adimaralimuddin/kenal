import Image from "next/image";
import { useState } from "react";
import Box from "./Box";
import Icon from "./Icon";
import Modal from "./Modal";

export default function ImgEditor({ imgs, set, name = "imgs", onSet }) {
  const [open, setOpen] = useState(false);
  const [cur, setCur] = useState(null);
  if (!imgs) return null;

  const setPrev = (file) => {
    setCur(file);
    setOpen(true);
    console.log("file ", file);
  };

  function onRemove(file) {
    const nImgs = imgs?.filter((i) => i !== file);
    set({ [name]: nImgs });
  }

  const type = (img) => (img?.type?.includes("image") ? "image" : "video");

  return (
    <div className="flex flex-wrap max-h-[300px] overflow-y-auto">
      {imgs?.map((file) => (
        <ImgItem
          file={file}
          onRemove={onRemove}
          type={type}
          setPrev={setPrev}
          key={file?.url}
        />
      ))}
      <Modal
        open={open}
        set={setOpen}
        className="p-3"
        div=" w-full max-w-lg min-h-[400px] "
      >
        {type(cur) == "image" ? (
          <div className="">
            <Image
              className="rounded-xl"
              src={cur?.url}
              objectFit="cover"
              layout="fill"
            />
          </div>
        ) : (
          <video
            className="rounded-xl max-h-[80vh] mx-auto  "
            controls
            autoPlay
          >
            <source src={cur?.url}></source>
          </video>
        )}
      </Modal>
    </div>
  );
}

function ImgItem({ file, onRemove, type, setPrev }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="flex items-center justify-center cursor-pointer overflow-hidden w-[120px] h-[120px] min-h-[120px] bg-cover bg-no-repeat bg-center m-1 rounded-md relative"
    >
      {type(file) == "image" ? (
        <Image
          onClick={() => setPrev(file)}
          src={file?.url}
          layout="fill"
          objectFit="cover"
        />
      ) : (
        <video
          autoPlay
          onClick={() => setPrev(file)}
          className="w-full h-full max-w-[100px]d min-h-[100px]d object-cover "
          loop
          muted
        >
          <source src={file?.url} />
        </video>
      )}
      {open && (
        <Icon
          onClick={(_) => onRemove(file)}
          className="absolute top-[2px] right-[2px] w-[20px]d h-[20px]d  bg-black bg-opacity-60 text-3xl font-semibold text-slate-300 p-1 "
        >
          close
        </Icon>
      )}
    </div>
  );
}
