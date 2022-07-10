import Icon from "./Icon";

export default function ButtonPrim(props) {
  const {
    active,
    activeStyle = "bg-pink-300 hover:bg-pink-400",
    normalStyle = "bg-indigo-300 hover:bg-indigo-400",
  } = props;
  return (
    <button
      {...props}
      className={
        ` flex items-center justify-center text-white my-3  px-5 
        ${props?.active ? activeStyle : normalStyle} ` + props?.className
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
