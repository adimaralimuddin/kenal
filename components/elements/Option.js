import useUser from "../../controls/useUser";
import Comp from "../main/Comp";
import { useAlert } from "./Alert";
import Box from "./Box";
import Icon from "./Icon";

const Option = ({
  icon = "more",
  iconClass,
  options,
  className,
  userId,
  par,
  rightText,
  iconActive = "on",
  state,
  onlyUser = false,
}) => {
  const { user } = useUser();
  const { open } = useAlert();

  if (options?.length <= 0) {
    return null;
  }

  return (
    <div className={" whitespace-nowrap flex " + className}>
      {options?.length > 0 && (
        <div
          className="flex gap-1 items-center cursor-pointer "
          onClick={(_) => {
            if (onlyUser && !user) {
              return open("you must signin to see options.");
            }
            if (state.open) {
              state.set({ open: false });
            } else {
              state.set({ open: true });
            }
          }}
        >
          <Icon
            active={iconActive}
            className={
              "  text-slate-600 dark:text-slate-200 w-[30px] h-[30px] text-md text-[20px] rounded-full aspect-square  hover:bg-slate-100 dark:hover:bg-slate-600 hover:text-gray-500 cursor-pointer  " +
              iconClass
            }
          >
            {icon}
          </Icon>
          <span className=" dark:text-slate-300"> {rightText}</span>
        </div>
      )}
      {state?.open && (
        <span className="relative">
          <div
            onMouseLeave={() => state.set({ open: false })}
            className={"absolute z-50 top-0 right-0 p-2 " + par}
            onClick={() => state.set({ open: false })}
          >
            <Box className="animate-pop  transition duration-200 ring-2 ring-gray-100 flex-col flex z-50 bg-white dark:bg-d2  shadow-lg p-1  overflow-hidden text-gray-500 dark:ring-slate-500 dark:ring-0  ">
              {options?.map((option) => {
                if (option?.secure && user?.uid !== userId) {
                  return null;
                }
                return (
                  <span
                    onClick={(_) => {
                      option?.action();
                      state.set({ open: false });
                    }}
                    className=" flex items-center justify-betweend flex-1 text-center cursor-pointer
                     hover:text-gray-600 p-2 dark:hover:text-gray-200 hover:bg-slate-100 dark:hover:bg-d3 px-2 min-w-[140px] rounded-md"
                    key={Math.random()}
                  >
                    <Icon className={" min-w-[20px] " + option?.className}>
                      {option?.icon}
                    </Icon>
                    <small
                      className={"mx-3 font-semibold " + option?.className}
                    >
                      {option?.text?.replace("_", " ")}
                    </small>
                  </span>
                );
              })}
            </Box>
          </div>
        </span>
      )}
    </div>
  );
};

export default Comp(Option, { open: false });
