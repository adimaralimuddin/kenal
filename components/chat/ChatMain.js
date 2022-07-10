import { useEffect, useState } from "react";
import useChat from "../../controls/useChat";
import Box from "../elements/Box";
import ConverItem from "./ConverItem";
import ConverMin from "./ConverMin";

export default function ChatMain() {
  const { convers, minimizeConver, minimized, openedd } = useChat();
  const [width, setWidth] = useState();

  function opened(passer) {
    return passer?.(convers?.filter((c) => c?.open == true));
  }

  useEffect(() => {
    window.onresize = (e) => {
      console.log(e.target.innerWidth, window.innerWidth);
      setWidth(window.innerWidth);
    };
  }, []);

  return (
    <div>
      <div className="fixed flex-cold bottom-0 right-0 flex overflow-visible z-50 ">
        <div className="flex justify-end overflow-x-auto items-end px-2 ">
          {convers
            ?.filter((c) => c?.open)
            ?.map((con, ind) => {
              if (ind > 3) return null;
              return (
                <ConverItem
                  width={width}
                  converItem={con}
                  ind={ind}
                  // key={con?.id}
                  key={con[0] + con[1]}
                />
              );
            })}
        </div>
        <div className="self-end pb-3">
          {convers
            ?.filter((c) => c?.open == false || c?.minimized)
            ?.map((con) => (
              <ConverMin converItem={con} key={con?.id} />
            ))}
        </div>
      </div>
    </div>
  );
}
