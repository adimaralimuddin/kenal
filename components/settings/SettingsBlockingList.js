import { useEffect, useState } from "react";
import useSettings from "../../controls/useSettings";
import Box from "../elements/Box";
import Icon from "../elements/Icon";
import Modal from "../elements/Modal";
import SearchBox from "../elements/SearchBox";
import BlockUserItem from "./SettingsBlockUserItem";
import BlockUserResultItem from "./SettingsBlockUserResultItem";

export default function BlockingLists({
  title,
  field,
  children,
  Valuetemplate = BlockUserItem,
  ResultTemplate = BlockUserResultItem,
  className,
  actionText,
  itemText,
  resultText,
}) {
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]);
  const { block, unBlock, users, settings } = useSettings();

  useEffect(() => {
    setResults([]);
  }, [open]);

  async function onSearching(val) {
    if (val) {
      let list = users;
      if (field) {
        list = users?.filter?.(
          (p) => !settings?.[field]?.find?.((x) => x == p.id)
        );
      }
      list = list?.filter?.((p) =>
        p?.userName?.toLowerCase()?.includes(val?.toLowerCase())
      );
      setResults(list);
    } else {
      setResults([]);
    }
  }

  function addToBlock(id) {
    block(field, id);
    console.log(results);
    setResults((p) => p.filter((x) => x?.id != id));
  }

  return (
    <div
      className={
        "p-2 py-3 ring-1 my-5 rounded-lg ring-slate-200 shadow-sm " + className
      }
    >
      <div className="px-3">
        <h4 className="font-semibold text-gray-600">{title}</h4>
        <small>{children}</small>
      </div>
      <div className="py-1">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center text-indigo-500 hover:bg-gray-50 text-start"
        >
          <Icon className="bg-indigo-400 text-white ring-1 mr-2 ring-gray-200 p-2 aspect-square shadow-md">
            add
          </Icon>
          Add user to {actionText || field?.replace("blocked", "blocked ")}
        </button>
        {settings?.[field]?.map?.((val) =>
          Valuetemplate ? (
            <Valuetemplate
              action={(id) => unBlock(field, id)}
              text={itemText}
              val={val}
              key={val?.id}
            />
          ) : null
        )}
      </div>
      <Modal
        open={open}
        set={setOpen}
        div=" w-full max-w-lg h-full max-h-[400px] "
      >
        <Box className="py-0 px-0 h-full">
          <div className="p-2">
            <h2 className="ring-1d text-center font-semibold text-lg">
              {title}
            </h2>
          </div>
          <hr />
          <div className="p-2 flex flex-col">
            <SearchBox onInput={onSearching} />
            <div className=" flex-1 flex flex-col overflow-y-auto ">
              {results?.map((val) =>
                ResultTemplate ? (
                  <ResultTemplate
                    action={addToBlock}
                    text={resultText}
                    val={val}
                    key={val?.id}
                  />
                ) : null
              )}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
