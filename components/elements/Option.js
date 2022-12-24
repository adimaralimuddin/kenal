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
        <button
          className="p-0 m-0 "
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
              " text-gray-400 text-md px-2 text-[20px] rounded-full p-1 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-d2 " +
              iconClass
            }
          >
            {icon}
          </Icon>
          {rightText}
        </button>
      )}
      {state?.open && (
        <span className="relative">
          <div
            onMouseLeave={() => state.set({ open: false })}
            className={"absolute z-50 top-0 right-0 p-2  " + par}
            onClick={() => state.set({ open: false })}
          >
            <Box className="animate-pop transition duration-200 ring-1 ring-gray-100 flex-col flex z-50 bg-white dark:bg-d2  shadow-md p-0 py-2 overflow-hidden text-gray-500 dark:ring-slate-500 dark:ring-0 ">
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
                     hover:text-gray-600 p-3 dark:hover:text-gray-200 hover:bg-slate-100 dark:hover:bg-d3 px-2 min-w-[140px] rounded-md"
                    key={Math.random()}
                  >
                    <Icon className=" min-w-[20px]">{option?.icon}</Icon>
                    <small className="mx-3 font-semibold">
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
