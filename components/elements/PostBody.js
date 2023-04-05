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
          " text-sm  dark:ring-0 px-3  p-3 rounded-3xl min-w-[100px] " +
          className
        }
      >
        {header}
        {/* <UserItem userId={replyTo?.[0]} noImg={"on"} par=" -top-14 pt-6"> */}
        <p className={"text-sm inlined text-start leading-4 "}> {body}</p>
        {/* </UserItem> */}
        {children}
      </div>
    </div>
  );
}
