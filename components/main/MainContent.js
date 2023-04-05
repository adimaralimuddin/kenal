import { useRouter } from "next/router";
import { useEffect } from "react";
import useUser from "../../controls/useUser";
import ExploreMain from "../explore/ExploreMain";
import MessagesMain from "../messages/MessagesMain";
import NotifMain from "../notification/NotifMain";
import PostMain from "../post/PostMain";
import SettingsPage from "../settings/SettingsPage";
import UserProfileBox from "../user/UserProfileBox";
import MainSideBar from "./MainSideBar";
import MainUserPage from "./MainUserPage";

export default function MainContent() {
  const { user } = useUser();
  const router = useRouter();
  const tab = router.query.tab;
  const selectedUserId = router.query?.userId;

  useEffect(() => {
    console.log("parent eff");
  }, []);

  return (
    <div className="flex flex-cold ring-1d md:bg-red-400d justify-center m-2 flex-wrapd gap-3  py-3 ">
      <div className="flex-1 hidden sm:flex max-w-[60px]  flex-col gap-4  lg:max-w-[240px]  h-screen">
        <UserProfileBox />
        <MainSideBar />
      </div>
      <div
        className={
          "flex-[2] px-[5px] ring-1d " +
          (tab === "profile" ? " max-w-5xl " : " max-w-4xl")
        }
      >
        {(tab === "home" || tab == undefined) && <PostMain />}

        {tab === "profile" && (
          <MainUserPage params={{ userId: selectedUserId || user?.uid }} />
        )}

        {tab === "settings" && <SettingsPage mini={true} />}
        {tab === "notification" && <NotifMain />}
        {tab === "messages" && <MessagesMain />}
        {tab === "explore" && <ExploreMain />}
      </div>
      {/* <div className=" flex-1 flex flex-col gap-4 max-w-[290px] bg-whited rounded-xl">
        <UserConfirmLIsts />
        <ChatsSideBar />
        <SuggestionMain />
      </div> */}
    </div>
  );
}
