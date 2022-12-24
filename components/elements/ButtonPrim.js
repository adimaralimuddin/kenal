import Icon from "./Icon";

export default function ButtonPrim(props) {
  const {
    activeStyle = "bg-pink-300 hover:bg-pink-400 dark:bg-pink-400 dark:hover:bg-pink-500",
    normalStyle = "bg-indigo-300 dark:bg-indigo-500 hover:bg-indigo-400 dark:hover:bg-indigo-600",
  } = props;
  return (
    <button
      {...props}
      className={
        ` flex items-center justify-center text-white my-3  px-5 max-w-[200px]
        ${props?.active ? activeStyle : normalStyle}  ` + props?.className
      }
    >
      {props?.icon && (
        <Icon className={` mr-2 hover:text-white text-white dark:text-white `}>
          {props?.icon}
        </Icon>
      )}
      {props?.children}
    </button>
  );
}
