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
          " text-sm text-gray-500 dark:text-gray-300 dark:ring-0  p-2 rounded-3xl min-w-[100px] " +
          className
        }
      >
        {header}
        <UserItem userId={replyTo?.[0]} noImg="on" par=" -top-14 pt-6">
          <small className={"text-sm inline text-start  "}> {body}</small>
        </UserItem>
        {children}
      </div>
    </div>
  );
}
