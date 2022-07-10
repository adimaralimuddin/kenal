import Icon from "../elements/Icon";
import NotificationMain from "../notification/NotificationMain";
import UserMainMenu from "../others/UserMainMenu";
import Link from "next/link";

const a = "LhdJ2cqxmkdjkMma4vZUiP6M22z2";
export default function MainHeader() {
  return (
    <div className="bg-white dark:bg-gray-700  shadow-sm  ">
      <div className="max-w-3xl  mx-auto p-4 pb-1 flex justify-between items-center ">
        <Link href="/feed">
          <h1 className="flex items-center font-bold text-2xl text-pink-400 cursor-pointer">
            Kenal
          </h1>
        </Link>
        <div className="flex items-center">
          <Icon className="text-2xl mx-3">home-2</Icon>
          <NotificationMain />
          <UserMainMenu />
        </div>
      </div>
    </div>
  );
}
