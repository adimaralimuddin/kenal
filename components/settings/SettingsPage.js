import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSettings from "../../controls/useSettings";
import useUser from "../../controls/useUser";
import Box from "../elements/Box";
import Icon from "../elements/Icon";
import MainLayout from "../main/MainLayout";
import UserMainMenu from "../others/UserMainMenu";
import SettingsBlocking from "./SettingsBlocking";
import SettingsNotification from "./SettingsNotification";
import PostSettings from "./SettingsPosts";

export default function SettingsPage({ mini = false }) {
  const { user, loaded } = useUser();
  const router = useRouter();
  const { listen, settings, initUsers } = useSettings();
  let [active, setActive] = useState("Privacy");

  useEffect(() => {
    if (!user) return;
    const authSettings = listen();
    initUsers();
    return () => {
      authSettings?.();
    };
  }, [user]);

  if (!user) {
    return null;
  }

  if (loaded && !user) {
    router.push("/feed");
  }

  return (
    // <MainLayout>
    <div className={"flex  justify-center gap-4 " + (mini ? "flex-col" : "")}>
      <div
        className={
          "box p-0 flex-[1] flex-wrap  flex  font-semibold text-slate-600 px-4 max-w-4xl " +
          (mini ? "" : " flex-col max-w-[300px] ")
        }
      >
        <TabItem active={active} set={setActive} mini={mini} icon="shield">
          Privacy
        </TabItem>
        <TabItem
          active={active}
          set={setActive}
          mini={mini}
          icon="notification-3"
        >
          Notification
        </TabItem>
        <TabItem active={active} set={setActive} mini={mini} icon="spam-3">
          Block
        </TabItem>
      </div>
      <div className="flex-[3]  max-w-4xl">
        <SettingsContent tab={active} />
      </div>
    </div>
    // </MainLayout>
  );
}

export const SettingsContent = ({ tab: active }) => {
  return (
    <div className="box">
      {active == "Privacy" && <PostSettings />}
      {active == "Notification" && <SettingsNotification />}
      {active == "Block" && <SettingsBlocking />}
    </div>
  );
};

function TabItem({ children, icon, active, set, mini }) {
  const isActive = (a, b) => (active == children ? a : b);

  return (
    <button
      onClick={() => set(children)}
      className={
        " flex items-center justify-center gap-2  py-3 rounded-none  " +
        (mini && " flex-1 ") +
        isActive(
          " border-primary-light dark:border-primary-dark text-primary-light dark:text-slate-100 " +
            (mini ? " border-b-[4px]" : " border-l-[4px]"),
          "hover:bg-slate-50 dark:hover:bg-slate-700 text-h2"
        )
      }
    >
      <Icon
        className={" " + isActive(" text-primary-light dark:text-slate-100 ")}
      >
        {icon}
      </Icon>
      <p className="text-sm hiddend sm:block">{children}</p>
    </button>
  );
}

function PageHeader() {
  return (
    <div className="bg-white flex p-2">
      <div className="flex items-center justify-between  max-w-5xl ring-1d mx-auto w-full">
        <button>
          <Icon className="font-semibold text-xl">home</Icon>
        </button>
        <UserMainMenu />
      </div>
    </div>
  );
}
