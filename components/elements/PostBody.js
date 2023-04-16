import UserItem from "../user/UserItem";

export default function PostBody({
  header,
  body,
  children,
  par,
  className,
  replyTo,
  plain = true,
}) {
  return (
    <div className={" flex flex-col  " + par}>
      <div
        className={
          " text-sm text-slate-600  font-normal px-3   py-2 rounded-2xl min-w-[100px] " +
          className
        }
      >
        {header}
        <p className={"text-sm inlined text-start leading-4d  "}> {body}</p>
        {children}
      </div>
    </div>
  );
}
