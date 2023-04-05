import Icon from "./Icon";

export default function ButtonPrim(props) {
  const {
    activeStyle = "bg-sec-light  dark:bg-sec-dark text-primary-light",
    normalStyle = "bg-primary-light dark:bg-primary-dark text-white ",
  } = props;
  return (
    <button
      {...props}
      className={
        `btn  flex items-center justify-center  px-5 max-w-[200px] font-medium
        ${props?.active ? activeStyle : normalStyle}  ` + props?.className
      }
    >
      {props?.icon && (
        <Icon
          className={
            ` mr-2  ` +
            (props?.active
              ? " text-primary-light dark:text-primary-dark font-semibold"
              : " text-white")
          }
        >
          {props?.icon}
        </Icon>
      )}
      {props?.children}
    </button>
  );
}
