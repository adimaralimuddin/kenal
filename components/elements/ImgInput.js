import { useRef } from "react";
import { useAlert } from "../elements/Alert";
export default function ImgInput({
  set,
  children,
  name = "imgs",
  single,
  onInput = () => {},
}) {
  const ref = useRef();
  const { open } = useAlert();

  function onInputHandler(e) {
    let pass = true;

    Array.from(e.target?.files)?.map((f) => {
      if (f?.size > 4000000) {
        pass = false;
        return open("the file must not exceed 4MB. " + f?.name);
      }
    });

    if (!pass) return;
    const files = Array.from(e.target?.files)?.map((y, i) => ({
      i,
      url: URL.createObjectURL(y),
      type: y?.type,
      file: y,
    }));

    if (files?.length >= 8) {
      return open("allowed upload upto 8 files only!");
    }
    const sortedFiles = files?.sort((a, b) => b.i - a.i);
    set?.({ [name]: sortedFiles });
    onInput(files);
  }

  function reclick() {
    ref?.current?.click();
  }

  return (
    <div className="cursor-pointer  " onClick={reclick}>
      <input
        ref={ref}
        hidden
        multiple={single ? false : "on"}
        onChange={onInputHandler}
        type="file"
        accept="image/*,video/*"
      />
      {children}
    </div>
  );
}
