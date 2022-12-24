import Icon from "./Icon";

export default function ButtonWarm(props) {
  return (
    <button
      {...props}
      className={
        ` text-white bg-red-400 hover:bg-red-500 flex items-center justify-center my-3   font-semibold  py-1 ` +
        props?.className
      }
    >
      {props?.icon && (
        <Icon type={props?.type} className="mr-1 text-white">
          {props?.icon}
        </Icon>
      )}

      {props?.children}
    </button>
  );
}
