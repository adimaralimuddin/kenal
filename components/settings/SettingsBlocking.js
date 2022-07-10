import useSettings from "../../controls/useSettings";
import BlockingLists from "./SettingsBlockingList";

function SettingsBlocking() {
  const { settings } = useSettings();

  return (
    <div className="text-gray-500 p-2 py-5">
      <h3 className="font-bold text-gray-600 text-lg py-2">Blocking</h3>
      <BlockingLists field="blockedusers" title="Users blocking">
        Once you block someone, that person can no longer see things you post on
        your timeline, tag you, invite you to events or groups, start a
        conversation with you, or add you as a friend. Note: Does not include
        apps, games or groups you both participate in.
      </BlockingLists>

      <BlockingLists field="blockedchats" title="Chats blocking">
        If you block messages and video calls from someone here, they won't be
        able to contact you in the Messenger app either. Unless you block
        someone's profile, they may be able to post on your timeline, tag you,
        and comment on your posts or comments.
      </BlockingLists>

      <BlockingLists field="blockedposts" title="Posts blocking">
        If you block messages and video calls from someone here, they won't be
        able to contact you in the Messenger app either. Unless you block
        someone's profile, they may be able to post on your timeline, tag you,
        and comment on your posts or comments.
      </BlockingLists>
    </div>
  );
}

export default SettingsBlocking;
