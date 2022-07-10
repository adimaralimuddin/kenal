import { useState } from "react";
import Box from "./Box";
import Icon from "./Icon";

export default function Option({
  icon = "more",
  options,
  className,
  userId,
  authId,
}) {
  const [open, setOpen] = useState(false);

  if (options?.length <= 0) {
    return null;
  }

  return (
    <div className={" whitespace-nowrap " + className}>
      {options?.length > 0 && (
        <button className="p-0 m-0" onClick={(_) => setOpen(true)}>
          <Icon
            active="on"
            className=" text-gray-400 text-md text-[20px] ring-d rounded-full p-1 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-600"
          >
            {icon}
          </Icon>
        </button>
      )}
      <i className="fa-regular fa-ellipsis"></i>
      <i className="fa-regular fa-ellipsis"></i>
      {open && (
        <span className="relative">
          <div
            onMouseLeave={(_) => setOpen(false)}
            className="absolute z-50 top-0 right-0 p-2"
          >
            <Box className="transition duration-500 ring-1 ring-gray-100 flex-col flex z-50 bg-white dark:bg-slate-600  shadow-md p-0 py-2 overflow-hidden text-gray-500 dark:ring-slate-500 dark:ring-2">
              {options?.map((option) => {
                if (option?.secure && authId !== userId) {
                  return null;
                }
                return (
                  <span
                    onClick={(_) => {
                      option?.action();
                      setOpen(false);
                    }}
                    className=" flex items-center justify-betweend flex-1 text-center cursor-pointer
                     hover:text-gray-600 p-3 dark:hover:text-gray-200 hover:bg-slate-100 dark:hover:bg-slate-500 px-2 min-w-[140px] rounded-md"
                    key={Math.random()}
                  >
                    <Icon className=" min-w-[20px]">{option?.icon}</Icon>
                    <small className="mx-3 font-semibold">{option?.text}</small>
                  </span>
                );
              })}
            </Box>
          </div>
        </span>
      )}
    </div>
  );
}
