import { useState } from "react";
import useSettings from "../../controls/useSettings";
import useUser from "../../controls/useUser";
import { useAlert } from "../elements/Alert";
import Option from "../elements/Option";
import PrivacyIcon from "../elements/PrivacyIcon";
import Verifier from "../elements/Verifier";
import UserItem from "../user/UserItem";

export default function Header({ data, state, removePost }) {
  const { user } = useUser();
  const [deleting, setDeleting] = useState(false);
  const [blocking, setBlocking] = useState(false);
  const { block } = useSettings();
  const { pop, open } = useAlert();
  const [active, setActive] = useState(false);

  const onPostRemove = () => {
    open("Deleting post . . . ", true);
    removePost(data?.id, data?.images, data?.vids, () => {
      pop("Post deleted!", "check");
    });
  };

  const onblockPost = () => {
    block("blockedposts", data?.postBy);
  };

  const options = [
    {
      text: "Edit Post",
      action: () => state.set((p) => ({ open: true })),
      secure: true,
      icon: "edit-2",
    },
    {
      text: "Delete Post",
      action: () => setDeleting(true),
      secure: true,
      icon: "delete-bin-5",
    },
  ];

  if (user?.uid !== data?.postBy) {
    options.push({
      text: "Add to Blocked Posts",
      action: () => setBlocking(true),
    });
  }

  if (data?.updatedAt) {
    options.push({
      text: state.viewEdit ? "hide edit" : "view edit",
      action: () => state.set((p) => ({ viewEdit: !p.viewEdit })),
    });
  }

  return (
    <div
      onMouseLeave={(_) => setActive(false)}
      onMouseEnter={(_) => setActive(true)}
      className="flex justify-between items-start p-2  "
    >
      <div className="flex items-center">
        <UserItem
          userId={data?.userId?.[0]}
          postUserSettings={state?.postUserSettings}
          passer={state.key("postUser")}
          className="py-0 px-0 dark:text-slate-300"
        >
          <small className="text-gray-400 dark:text-gray-400 text-[.7em] block">
            {new Date(data?.timestamp?.seconds)?.toDateString()}
          </small>
        </UserItem>
        <div className="flex pt-1d items-center ring-1d">
          {data?.to && <small className="ml-2">to</small>}
          <UserItem userId={data?.to} noImg="on" className="py-0  px-0d" />
        </div>
        <span
          title={"privacy is " + data?.privacy}
          className="inline my-2 mx-1 text-sm text-slate-500"
        >
          <PrivacyIcon privacy={data?.privacy} />
        </span>
        <Verifier onYes={onPostRemove} open={deleting} set={setDeleting} />
        <Verifier onYes={onblockPost} open={blocking} set={setBlocking} />
      </div>
      <Option
        show={active}
        options={options}
        userId={data?.userId?.[0]}
        onlyUser={true}
      />
    </div>
  );
}
