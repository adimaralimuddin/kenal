export default function Icon(props) {
  const {
    type = "line",
    size = "lg",
    children,
    active,
    className,
    activeStyle,
    inActiveStyle,
    fill = "fill",
  } = props;

  return (
    <i
      {...props}
      className={`text-slate-600 dark:text-gray-400 hover:scale-105 hover:text-gray-500d flex aspect-square items-center justify-center rounded-full
      ri-${size} ri-${children}-${active ? fill : type} 
        ${active ? activeStyle : inActiveStyle}  ${className} `}
    >
      {""}
    </i>
  );
}
