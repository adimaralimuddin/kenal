import { useEffect, useState } from "react";

export default function Toggle({ defVal, onToggle }) {
  const [val, setVal] = useState(defVal);

  const active = (a = true, b = false) => (val ? a : b);

  useEffect(() => {
    setVal(defVal);
  }, [defVal]);

  function onToggleHandler() {
    setVal((p) => {
      onToggle?.(!p);
      return !p;
    });
  }

  return (
    <div
      className={
        " hover:scale-105  cursor-pointer flex ring-[2px] max-w-[45px] min-w-[45px] rounded-full p-[3px] " +
        active(
          "justify-end bg-pink-300 dark:bg-pink-400 ring-pink-200 dark:ring-pink-300",
          "justify-start bg-pink-50 dark:bg-slate-600 ring-pink-200 dark:ring-slate-700 "
        )
      }
      onClick={onToggleHandler}
    >
      <div
        className={
          `ring-1  ring-pink-200 transition-position duration-200 rounded-full p-[9px] aspect-square bg-indigo-40 ` +
          active(
            "bg-white dark:bg-pink-100",
            "bg-white dark:bg-slate-400 dark:ring-0"
          )
        }
      ></div>
    </div>
  );
}
