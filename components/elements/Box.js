export default function Box(props) {
  return (
    <div
      {...props}
      className={
        ` bg-white dark:bg-slate-700 dark:ring-gray-800 dark:text-gray-400 p-3 rounded-lg m-2  ` +
        props?.className
      }
    >
      {props?.children}
    </div>
  );
}
