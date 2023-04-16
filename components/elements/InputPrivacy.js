import { useEffect, useState } from "react";
import Icon from "./Icon";
import Option from "./Option";

function InputPrivacy({ onInput, defaultValue }) {
  const [val, setVal] = useState(getdefaultValue());
  function select(val, icon_) {
    console.log(val);
    setVal([val, icon_]);
    onInput?.(val);
  }

  useEffect(() => {
    setVal(getdefaultValue());
  }, [defaultValue]);

  function getdefaultValue() {
    switch (defaultValue) {
      case "Public":
        return [defaultValue, "eartg"];
      case "Followers":
        return [defaultValue, "user-smile"];
      case "Only_me":
        return [defaultValue, "lock-2"];
      default:
        return ["Public", "earth"];
    }
  }

  const options = [
    { text: "Public", icon: "earth", action: () => select("Public", "earth") },
    {
      text: "Followers",
      icon: "user-smile",
      action: () => select("Followers", "user-smile"),
    },
    {
      text: "Only_me",
      icon: "lock-2",
      action: () => select("Only_me", "lock-2"),
    },
  ];
  return (
    <div className="flex items-center font-semibold rounded-xl bg-slate-100 hover:bg-slate-200  dark:bg-slate-700 dark:hover:bg-slate-600">
      <Option
        rightText={
          <small className="flex items-center p-0 text-[13px] text-slate-500 dark:text-slate-300">
            {val?.[0]?.replace("_", " ")}
            <Icon className="mx-1">arrow-down-s</Icon>
          </small>
        }
        par="  -top-1 py-0 px-0"
        icon={val?.[1]}
        iconActive={null}
        options={options}
      ></Option>
    </div>
  );
}

export default InputPrivacy;
