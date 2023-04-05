export default function Icon(props) {
  const {
    type = "line",
    size = 28,
    children,
    active,
    className,
    activeStyle,
    inActiveStyle,
    fill = "fill",
    ...iconProps
  } = props;

  return (
    <i
      style={{
        width: size,
      }}
      {...iconProps}
      className={`text-slate-600 dark:text-gray-400   hover:text-gray-500d flex aspect-square items-center justify-center rounded-full
      ri-${"lg"} ri-${children}-${active ? fill : type} 
        ${active ? activeStyle : inActiveStyle}  ${className} `}
    >
      {""}
    </i>
  );
}
