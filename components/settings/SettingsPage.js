import useUser from "../../controls/useUser";
import PostSettings from "./SettingsPosts";
import Box from "../elements/Box";
import { useEffect, useState } from "react";
import useSettings from "../../controls/useSettings";
import SettingsBlocking from "./SettingsBlocking";
import SettingsNotification from "./SettingsNotification";
import Icon from "../elements/Icon";
import Avatar from "../elements/Avatar";
import UserMainMenu from "../others/UserMainMenu";
import MainHeader from "../main/MainHeader";

export default function SettingsPage() {
  const { user } = useUser();
  const { listen, settings, initUsers } = useSettings();
  let [active, setActive] = useState("Privacy");

  useEffect(() => {
    listen();
    initUsers();
  }, [user]);

  // console.log(settings);

  return (
    <div>
      {/* <PageHeader /> */}
      <MainHeader />
      <div className="flex justify-center">
        <Box className="max-w-[300px] flex-[1] my-7 flex flex-col font-semibold text-slate-600">
          <TabItem active={active} set={setActive} icon="shield">
            Privacy
          </TabItem>
          <TabItem active={active} set={setActive} icon="notification-3">
            Notification
          </TabItem>
          <TabItem active={active} set={setActive} icon="spam-3">
            Block
          </TabItem>
        </Box>
        <div className="flex-[3] p-2 max-w-3xl">
          <Box className="my-5">
            {active == "Privacy" && <PostSettings />}
            {active == "Block" && <SettingsBlocking />}
            {active == "Notification" && <SettingsNotification />}
          </Box>
        </div>
      </div>
    </div>
  );
}

function TabItem({ children, icon, active, set }) {
  const isActive = (a, b) => (active == children ? a : b);

  return (
    <button
      onClick={() => set(children)}
      className={
        "ring-  py-2 " +
        isActive(
          "bg-pink-300 text-white hover:bg-pink-400",
          "hover:bg-slate-50"
        )
      }
    >
      <Icon className="mx-2">{icon}</Icon>
      {children}
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
