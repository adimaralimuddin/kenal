import { useEffect } from "react";
import IconBtn from "./IconBtn";

export default function Modal({ open, set, children, div, className }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflowY = "hidden";
    }
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);
  if (!open) return null;
  return (
    <div
      onClick={(_) => set(false)}
      className={
        " flex z-50 flex-col items-center justify-center bg-gray-900 bg-opacity-60 backdrop-blur-md fixed top-0 left-0 w-full h-full overflow-auto overscroll-none " +
        className
      }
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={
          " relative  flex flex-col animate-pop w-full max-w-xl  p-2 " + div
        }
      >
        <IconBtn
          onClick={(_) => {
            set(false);
          }}
          className="absolute -top-5 right-2 rounded-lg min-w-[35px] min-h-[35px] flex flex-col items-center justify-center font-bold shadow-md"
          // className="absolute -top-5 right-2 text-xl w-[35px] h-[35px] text-center font-bold ring-2 ring-slate-200 dark:ring-slate-800"
        >
          close
        </IconBtn>
        {children}
      </div>
    </div>
  );
}
