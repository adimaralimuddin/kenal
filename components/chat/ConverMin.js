import { useEffect, useState } from "react";
import toolGetDoc from "../../controls/toolGetDoc";
import useChat from "../../controls/useChat";
import Avatar from "../elements/Avatar";
import Box from "../elements/Box";
import Icon from "../elements/Icon";
import Image from "next/image";

function ConverMin({ converItem, className }) {
  const { conver } = converItem;
  const { openConver, removeConver } = useChat();
  const [user, setUser] = useState();
  const [active, setActive] = useState(false);

  useEffect(() => {
    getUser2();
  }, [conver]);

  const getUser2 = async () => {
    const user2 = await toolGetDoc("users", conver?.[1]);
    setUser(user2);
  };

  return (
    <div
      className={"relative z-10 flex items-center mr-3 " + className}
      onMouseLeave={(_) => setActive(false)}
      onMouseEnter={(_) => setActive(true)}
    >
     
      {active && (
        <Icon
          className={` absolute z-10 bg-white rounded-full p-2 shadow-md -top-3 -right-3 max-w-[30px] max-h-[30px] min-w-[30px] min-h=[30px] flex items-center justify-center text-gray-500 cursor-pointer`}
          onClick={() => removeConver(conver)}
        >
          close
        </Icon>
      )}
      <div
        onClick={(_) => openConver(conver)}
        className=" ring-4 ring-white shadow-lg cursor-pointer overflow-hidden relative min-w-[50px] min-h-[50px] rounded-full "
      >
        {user?.avatar && (
          <Image src={user?.avatar} layout="fill" objectFit="cover" />
        )}
      </div>
    </div>
  );
}

export default ConverMin;
