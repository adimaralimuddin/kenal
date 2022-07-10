export default function Droper({
  open,
  set,
  children,
  par,
  div,
  autoClose = true,
}) {
  if (!open) return null;
  return (
    <span className="relative z-30">
      <div onMouseLeave={(_) => set(false)} className={" absolute " + par}>
        <div
          onClick={(_) => autoClose && set(false)}
          className={
            "flex flex-col bg-white  dark:bg-gray-700 dark:ring-gray-600 dark:ring-2 p-5 shadow-md rounded-md whitespace-nowrap ring-1 ring-gray-200 dark:text-gray-400 " +
            div
          }
        >
          {children}
        </div>
      </div>
    </span>
  );
}
