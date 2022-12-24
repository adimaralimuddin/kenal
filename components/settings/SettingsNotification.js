import { useEffect, useState } from "react";
import useSettings from "../../controls/useSettings";
import Toggle from "../elements/Toggle";
import BlockingLists from "./SettingsBlockingList";

function SettingsNotification() {
  const { settings } = useSettings();
  // console.log(settings);

  const Header = ({ children }) => (
    <h2 className="text-slate-600 dark:text-slate-300 font-semibold">
      {children}
    </h2>
  );
  return (
    <div className="text-gray-500 dark:text-gray-400 p-5">
      <div>
        <h2 className="border-b-2  dark:border-slate-600 font-bold text-lg text-gray-600 dark:text-gray-300 pb-3 mb-3">
          Notification
        </h2>
      </div>
      <div>
        <Header>Posts</Header>
        <Item field="notifreactpost" text="react">
          Notify when someone react on your posts
        </Item>
        <Item field="notifcommentpost" text="post comment">
          Notify when someone comment on your post
        </Item>
        <Item field="notifsharepost" text="post comment">
          Notify when someone share your post
        </Item>
        <Item field="notifpostprofile" text="post comment">
          Notify when someone post on your profile
        </Item>
        {/* <Item field="notifpostprofile" text="post comment">
          Notify when someone post on your profile
        </Item> */}
        <Header>Comments</Header>
        <Item field="notifreactcomment" text="reply">
          Notify when someone react on your comment
        </Item>
        <Item field="notifreplycomment" text="reply">
          Notify when someone reply on your comment
        </Item>

        <Header>Replies</Header>
        <Item field="notifreactreply" text="reply">
          Notify when someone react on your replies
        </Item>
        <Item field="notifmention" text="reply">
          Notify when someone mentioned you on your reply
        </Item>

        <Header>tags and follows</Header>
        <Item field="notiftaggedpost" text="tagged">
          Notify when someone tagged you on a post
        </Item>
        <Item field="notiffollow" text="follow">
          Notify when someone started to followed you
        </Item>
        <Item field="notifunfollow" text="unfollow">
          Notify when someone just unfollowed you
        </Item>
      </div>
    </div>
  );
}

export default SettingsNotification;

function Item({ field, title, children, text, actionText }) {
  const { update, settings } = useSettings();
  const [open, setOpen] = useState(false);

  function onToggleHandler(val) {
    update(field, val);
  }

  return (
    <div className="p-2 hover:ring-indigo-50 border-b dark:border-slate-700 rounded-mdd ring-slate-200  my-3">
      <div className="flex items-center justify-between text-sm ">
        <p>{children}</p>
        <Toggle defVal={settings?.[field]} onToggle={onToggleHandler} />
      </div>
      <div>
        <small
          onClick={() => setOpen((p) => !p)}
          className="cursor-pointer underline text-indigo-400 font-semibold"
        >
          edit blacklists
        </small>
        {open && (
          <div className="flex">
            <BlockingLists
              field={field + "list"}
              title={title}
              className="flex-1 mx-1"
              actionText={text + " blocked notification"}
              resultText="turn off"
              itemText="turn on"
            >
              you will not recieve {text && "a"} {text} notifications from this
              list of people.
            </BlockingLists>
            {/* <BlockingLists className="flex-1 mx-1" title={"blacklists"} /> */}
          </div>
        )}
      </div>
    </div>
  );
}
