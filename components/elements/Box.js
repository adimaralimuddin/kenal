export default function Box(props) {
  return (
    <div
      {...props}
      className={
        ` bg-white dark:bg-box-dark dark:ring-gray-900 dark:text-gray-400 p-3 rounded-lg m-2  ` +
        props?.className
      }
    >
      {props?.children}
    </div>
  );
}
