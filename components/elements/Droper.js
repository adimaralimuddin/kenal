export default function Droper({
  open,
  set,
  children,
  par,
  div,
  autoClose = true,
  divProps,
}) {
  if (!open) return null;
  return (
    <span className="relative z-30">
      <div
        onMouseLeave={(_) => set(false)}
        className={" absolute animate-pop " + par}
      >
        <div
          onClick={(e) => {
            autoClose && set(false);
            divProps?.onClick?.(e);
          }}
          className={
            "flex flex-col bg-white  dark:bg-d1 dark:ring-gray-600 dark:ring-0 p-5 shadow-md rounded-md whitespace-nowrap ring-1 ring-gray-200 dark:text-gray-400 " +
            div
          }
          {...divProps}
        >
          {children}
        </div>
      </div>
    </span>
  );
}
