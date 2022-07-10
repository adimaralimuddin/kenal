export default function IconBtn(props) {
  const { type = "line", size = "lg", children, active, className } = props;
  return (
    <i
      {...props}
      className={
        `hover:scale-105 cursor-pointer bg-gray-100 dark:bg-slate-600 text-gray-600 dark:text-slate-300 rounded-md p-1 hover:text-gray-700 ri-${size} ri-${children}-${
          active ? "fill" : type
        } ` + className
      }
    >
      {""}
    </i>
  );
}
