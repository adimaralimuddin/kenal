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
        "hover:ring-indigo-400  cursor-pointer flex ring-pink-200 ring-[2px] max-w-[45px] min-w-[45px] rounded-full p-[3px] " +
        active("justify-end bg-pink-300", "justify-start bg-pink-50")
      }
      onClick={onToggleHandler}
    >
      <div
        className={`ring-1  ring-pink-200 transition-position duration-200 rounded-full p-[9px] aspect-square bg-indigo-40 bg-white`}
      ></div>
    </div>
  );
}
