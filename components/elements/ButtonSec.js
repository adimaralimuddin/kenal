import Icon from "./Icon";

export default function ButtonSec(props) {
  return (
    <button
      {...props}
      className={
        `ring-[2px] ring-indigo-300 dark:ring-indigo-400 text-indigo-400 flex items-center justify-center py-0d my-3  hover:ring-indigo-400 dark:hover:ring-indigo-500 hover:text-indigo-500 font-semibold dark:text-indigo-300 dark:hover:text-indigo-400 ` +
        props?.className
      }
    >
      {props?.icon && (
        <Icon
          type={props?.type}
          className="mx-2 dark:text-indigo-300 dark:hover:text-indigo-400"
        >
          {props?.icon}
        </Icon>
      )}

      {props?.children}
    </button>
  );
}
