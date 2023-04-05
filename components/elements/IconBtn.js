export default function IconBtn(props) {
  const {
    type = "line",
    size = "lg",
    prime,
    children,
    active,
    className,
  } = props;
  return (
    <i
      {...props}
      className={
        ` cursor-pointer   rounded-md p-2  ri-${size} ri-${children}-${
          active ? "fill" : type
        } ` +
        (prime
          ? " bg-primary-light text-white "
          : " bg-slate-100 dark:bg-slate-600 hover:bg-slate-200 dark:hover:bg-slate-500 ") +
        className
      }
    >
      {""}
    </i>
  );
}
