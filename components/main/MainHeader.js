import Link from "next/link";
import Alert from "../elements/Alert";
import NotificationMain from "../notification/NotificationMain";
import UserMainMenu, { ThemeToggle } from "../others/UserMainMenu";
import MainBurgerMenu from "./MainBurgerMenu";

export default function MainHeader({ className, logoClass }) {
  return (
    <div
      className={
        "bg-slate-50  dark:bg-box-dark  shadow-smd items-center z-40 px-4 " +
        className
      }
    >
      {/* <Alert /> */}
      <div className=" max-w-6xl  mx-auto  py-2 flex gap-2 justify-between items-center  ">
        <div className="flex gap-2 items-center">
          <MainBurgerMenu />
          <Link href="/feed">
            <h1
              className={
                "font-verdana   flex items-center  font-bold text-4xl text-primary-light dark:text-pink-300 cursor-pointer " +
                logoClass
              }
            >
              kenal
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <NotificationMain />
          <UserMainMenu />
        </div>
      </div>
    </div>
  );
}
