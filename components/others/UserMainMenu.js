import Link from "next/link";
import { useEffect, useState } from "react";
import useUser from "../../controls/useUser";

import Droper from "../elements/Droper";
import Icon from "../elements/Icon";
import LinkCreateAccount from "../elements/LinkCreateAccount";

import { useTheme } from "next-themes";
import toolGetDoc from "../../controls/toolGetDoc";
import Box from "../elements/Box";
import UserDemo from "../user/UserDemo";
import UserItem from "../user/UserItem";
import UserLoginWithEmail from "../user/UserLoginWithEmail";
export default function UserMainMenu() {
  const { set, userProfile, user, logout } = useUser();
  const [open, setOpen] = useState(false);
  const [openLog, setOpenLog] = useState(false);

  useEffect(() => {
    if (user) {
      toolGetDoc("profile", user.uid, (user) => set({ userProfile: user }));
    }
  }, [user]);
  return (
    <div className="flex z-50d">
      {/* {user?.uid} */}
      {user && (
        <div onMouseEnter={(_) => setOpen(true)} className=" cursor-pointer">
          <UserItem userId={user?.uid} noName={true} />
        </div>
      )}
      <Droper
        par=" z-50 -right-0 pt-14 w-[50px]"
        open={open}
        set={setOpen}
        div="px-3 py-3 text-sm font-semibold text-gray-600 "
      >
        <Box className="z-50d absolute -right-2 top-11 shadow-xl ring-1 ring-slate-100 p-[30px]">
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
          <div className="ring-1 ring-slate-300 dark:ring-d2 mx-2"></div>

          <button
            onClick={logout}
            className="hover:text-gray-600  dark:hover:text-gray-300 flex items-center justify-start px-5 py-2 "
          >
            <Icon className="mx-3">logout-box</Icon>
            <h3>Logout</h3>
          </button>
        </Box>
      </Droper>
      {!user && (
        <div onMouseEnter={(_) => setOpenLog(true)}>
          <button className=" dark:text-slate-400">Login</button>
        </div>
      )}
      <LogoutMenu open={openLog} set={setOpenLog} />
    </div>
  );
}

export function LogoutMenu({ open, set }) {
  const { loginWithGoogle } = useUser();
  const [loginPop, setLoginPop] = useState(false);

  const onLoginWithGoogle = () => {
    loginWithGoogle(() => {
      location.replace("/feed");
    });
  };

  return (
    <Droper par=" right-0 top-0 pt-12 w-[50px]" open={open} set={set}>
      <Box className="flex flex-col absolute top-8 shadow-sm -right-2 p-[30px]">
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="flex flex-col gap-2 "
        >
          <UserLoginWithEmail open={loginPop} set={setLoginPop} />
          <button
            onClick={() => setLoginPop(true)}
            className="btn-prime text-base px-6"
            active={true}
          >
            Login With Email
          </button>
          <button
            className=" btn-sec text-base px-6 "
            onClick={onLoginWithGoogle}
          >
            Signin With Google
          </button>
          <LinkCreateAccount />
        </div>
        <p className="text-center text-sm">OR</p>
        <UserDemo />
      </Box>
    </Droper>
  );
}

export function ThemeToggle() {
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
      className=" hover:text-gray-600  dark:hover:text-gray-300 flex items-center justify-start py-0 my-0 px-0 mx-0  "
    >
      <Icon className=" text-2xl">
        {currentTheme() == "dark" ? "sun" : "moon"}
      </Icon>
    </button>
  );
}
