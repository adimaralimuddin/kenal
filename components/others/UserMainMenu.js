import { useState } from "react";
import useUser from "../../controls/useUser";
import Avatar from "../elements/Avatar";
import ButtonPrim from "../elements/ButtonPrim";
import ButtonSec from "../elements/ButtonSec";
import Droper from "../elements/Droper";
import Icon from "../elements/Icon";
import Link from "next/link";

import { useTheme } from "next-themes";
export default function UserMainMenu() {
  const { user, logout, loginWithGoogle } = useUser();
  const [open, setOpen] = useState(false);
  const [openLog, setOpenLog] = useState(false);
  return (
    <div className="flex">
      {user && (
        <div
          onMouseEnter={(_) => setOpen(true)}
          className="min-w-[40px] max-w-[40px]"
        >
          <Avatar src={user?.photoURL} width={30} height={30} />
        </div>
      )}

      <Droper
        par=" -right-0 pt-14"
        open={open}
        set={setOpen}
        div="px-3 py-3 text-sm font-semibold text-gray-600 "
      >
        <Link href={`/user/${user?.uid}`}>
          <button className="hover:text-gray-600 dark:hover:text-gray-300 flex items-center justify-start ring-1d px-5 py-2">
            <Icon className="mx-3">user</Icon>
            <h3>My profile</h3>
          </button>
        </Link>
        <Link href="/settings">
          <button className="hover:text-gray-600  dark:hover:text-gray-300 flex items-center justify-start px-5 py-2 ">
            <Icon className="mx-3">settings-4</Icon>
            <h3>Settings</h3>
          </button>
        </Link>
        <ThemeToggle />
        <hr />
        <button
          onClick={logout}
          className="hover:text-gray-600  dark:hover:text-gray-300 flex items-center justify-start px-5 py-2 "
        >
          <Icon className="mx-3">logout-box</Icon>
          <h3>Logout</h3>
        </button>
      </Droper>

      {!user && (
        <div onMouseEnter={(_) => setOpenLog(true)}>
          <button>Login</button>
        </div>
      )}

      <Droper
        par=" right-0 top-0 pt-12"
        open={openLog}
        set={setOpenLog}
        className="relative"
      >
        <h2>Login</h2>
        <input placeholder="email" />
        <input placeholder="password" />
        <ButtonPrim>Login</ButtonPrim>
        <hr />
        <ButtonSec onClick={loginWithGoogle}>Signin With Google</ButtonSec>
      </Droper>
    </div>
  );
}

function ThemeToggle() {
  const { systemTheme, theme, setTheme } = useTheme();

  const currentTheme = () => (theme === "system" ? systemTheme : theme);

  function toggle() {
    if (currentTheme() === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }
  return (
    <button
      onClick={toggle}
      className="hover:text-gray-600  dark:hover:text-gray-300 flex items-center justify-start px-5 py-2 "
    >
      <Icon className="mx-3">{currentTheme() == "dark" ? "sun" : "moon"}</Icon>
      <h3>{currentTheme() == "dark" ? "light" : "Dark"}</h3>
    </button>
  );
}
