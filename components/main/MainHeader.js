import NotificationMain from "../notification/NotificationMain";
import UserMainMenu, { ThemeToggle } from "../others/UserMainMenu";
import Link from "next/link";
import Alert from "../elements/Alert";

export default function MainHeader({ className }) {
  return (
    <div
      className={
        "bg-slate-50  dark:bg-box-dark transition-colors shadow-sm items-center z-40 " +
        className
      }
    >
      <Alert />
      <div className=" max-w-3xl  mx-auto px-4 py-2 flex justify-between items-center  ">
        <Link href="/feed">
          <h1 className="font-verdana   flex items-center  font-bold text-3xl text-pink-400 dark:text-pink-300 cursor-pointer">
            kenal
          </h1>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <NotificationMain />
          <UserMainMenu />
        </div>
      </div>
    </div>
  );
}
