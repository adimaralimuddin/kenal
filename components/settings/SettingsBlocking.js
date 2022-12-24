import BlockingLists from "./SettingsBlockingList";

function SettingsBlocking() {
  return (
    <div className="text-gray-500 dark:text-gray-400 p-5 ">
      <h3 className="font-bold border-b-2 dark:border-slate-600 text-gray-600 dark:text-gray-300 text-lg pb-3 mb-3">
        Blocking
      </h3>
      <BlockingLists field="blockedusers" title="Users blocking">
        Once you block someone, you can no longer see things from that person.
        and that person can no longer see things from you such as your stories,
        post, comments and replies. they can no longer see your post instantly,
        while comments and replies take affect after they had refreshed thier
        page.
      </BlockingLists>

      <BlockingLists field="blockedposts" title="Posts blocking">
        If you block someone's posts here, you won't be able to see things they
        post. you may still see thier stories, comments and replies as well as
        thier other information according to thier settings.
      </BlockingLists>
      <BlockingLists field="blockedstories" title="Stories blocking">
        If you block someone's stories, you can no longer see stories posted by
        theme. you may still see thier posts, comments, replies anywere as well
        as thier other informations according to thier settings.
      </BlockingLists>
      <BlockingLists field="blockedchats" title="Chats blocking">
        If you block chats from someone here, they won't be able to chat you.
        howerver they may still see things you post. reply on your post, and
        sees information according to your settings.
      </BlockingLists>
    </div>
  );
}

export default SettingsBlocking;
