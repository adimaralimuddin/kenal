import React from "react";

export default function TextArea({ className, ...props }) {
  function auto_grow(e) {
    e.target.style.height = "5px";
    e.target.style.height = e.target.scrollHeight + "px";
  }

  return (
    <textarea
      autoFocus
      onKeyUp={auto_grow}
      onFocus={(e) => {
        e.target.selectionStart = 0;
        e.target.selectionEnd = e.target.value.length;
      }}
      {...props}
      className={
        " min-w-[10px] flex h-[34px] items-center justify-center min-h-[30px] resize-none ring-d2 max-h-[150px] overflow-y-auto flex-1 my-0 text-sm bg-transparent py-[7px] px-2 " +
        className
      }
    />
  );
}
