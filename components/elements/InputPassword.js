import React, { useState } from "react";

export default function InputPassword({
  className,
  inputClassName,
  placeholder,
  onInput,
  value,
  ...props
}) {
  const [hide, setHide] = useState(true);
  return (
    <div
      className={
        "flex items-stretch ring-1 rounded-lg overflow-hidden ring-slate-300 dark:ring-d1 " +
        className
      }
    >
      <input
        className={
          "flex-1 m-0 bg-transparent dark:bg-transparent rounded-none " +
          inputClassName
        }
        onInput={onInput}
        value={value}
        // onInput={(e) => setPassWord(e.target?.value)}
        // value={passWord}
        placeholder={placeholder || "password"}
        type={hide ? "password" : "text"}
        required
      />
      <p
        className="flex flex-col items-center justify-center select-none cursor-pointer text-right px-2 min-w-[55px] dark:bg-d1 dark:hover:bg-d2"
        onClick={() => setHide((p) => !p)}
      >
        {hide ? "show" : "hide"}
      </p>
    </div>
  );
}
