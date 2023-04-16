import { useRouter } from "next/router";
import useUser from "../../controls/useUser";
import ExploreMain from "../explore/ExploreMain";
import ExplorePostItem from "../explore/explorePosts/ExplorePostItem";
import ExploreStoryItem from "../explore/exploreStories/ExploreStoryItem";
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

  return (
    <div className="  flex flex-1 flex-cold ring-1d md:bg-red-400d justify-center m-2 gap-3  py-3 bg-red-400d">
      <div className="w-full self-start hidden sm:flex max-w-[60px]  flex-col gap-4  lg:max-w-[240px] ">
        <UserProfileBox />
        <MainSideBar />
      </div>
      <div className={"flex flex-col flex-[2] px-[5px] max-w-4xl "}>
        {(tab === "home" || tab == undefined) && <PostMain />}

        {tab === "profile" && (
          <MainUserPage params={{ userId: selectedUserId || user?.uid }} />
        )}

        {tab === "settings" && <SettingsPage mini={true} />}
        {tab === "notification" && <NotifMain />}
        {tab === "messages" && <MessagesMain />}
        {tab === "explore" && <ExploreMain />}
        {tab === "postitem" && <ExplorePostItem />}
        {tab === "storyitem" && <ExploreStoryItem />}
        {/* {tab} */}
      </div>
    </div>
  );
}
