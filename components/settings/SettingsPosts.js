import useSettings from "../../controls/useSettings";
import Icon from "../elements/Icon";
import Option from "../elements/Option";

export default function PostSettings() {
  const { settings } = useSettings();
  return (
    <div className="p-5 text-gray-500 dark:text-gray-400">
      <h3 className="border-b-2 dark:border-slate-600 font-bold text-gray-600 dark:text-gray-300 text-lg pb-3 mb-3">
        Post Settings
      </h3>
      <SetSelect value={settings?.seeFuturePost} field="seeFuturePost">
        Who can see your future posts
      </SetSelect>
      <SetSelect value={settings?.seeOtherStories} field="seeOtherStories">
        Who can see your future stories
      </SetSelect>
      <SetSelect value={settings?.seeFollowedPeople} field="seeFollowedPeople">
        Who can see the people you follow
      </SetSelect>
      <SetSelect value={settings?.seeFollowers} field="seeFollowers">
        Who can see your followers
      </SetSelect>
      <SetSelect value={settings?.postToProfile} field="postToProfile">
        Who can post on your profile
      </SetSelect>
      <SetSelect value={settings?.seeOtherPost} field="seeOtherPost">
        Who can see what other's posted on your profile
      </SetSelect>
      <SetSelect value={settings?.commentPost} field="commentPost">
        Who can comment on your public posts
      </SetSelect>
      <SetSelect value={settings?.commentStory} field="commentStory">
        Who can comment on your public stories
      </SetSelect>
      <SetSelect value={settings?.seeAbout} field="seeAbout">
        Who can see your about information
      </SetSelect>
      <SetSelect value={settings?.canChat} field="canChat">
        Who can reach to chat you
      </SetSelect>
    </div>
  );
}

function SetSelect({ children, value, field }) {
  const { update } = useSettings();
  const initOptions = [
    { text: "Public", icon: "earth", action: () => update(field, "Public") },
    {
      text: "Followers",
      icon: "user-smile",
      action: () => update(field, "Followers"),
    },
    { text: "Only_me", icon: "lock-2", action: () => update(field, "Only_me") },
  ];

  return (
    <div className="flex text-sm hover:bg-indigo-50 dark:hover:bg-d2 px-2 rounded-xl flex-wrap items-center justify-between  py-[8px]">
      <div className="flex-1 ring-1d">
        <p className="">{children}</p>
      </div>
      <div className="ml-2 font-semibold text-sm flex items-center">
        <span className="flex mx-1 items-center bg-gray-200 dark:bg-slate-600 p-1 rounded-xl text-gray-600 dark:text-gray-200">
          <Icon>{initOptions?.find((opt) => opt?.text == value)?.icon}</Icon>
          <p className="mx-1 ">{value?.replace("_", " ") || " ... "}</p>
        </span>
        <Option options={initOptions} icon="pencil" />
      </div>
    </div>
  );
}

//
