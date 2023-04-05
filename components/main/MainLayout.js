import { useEffect } from "react";
import UseApp from "../../controls/useApp";
import useUser from "../../controls/useUser";
import MainHeader from "./MainHeader";

export default function MainLayout({ children, className, headerCss }) {
  const { listen: listenUser, setOffline, user } = useUser();
  const { listen: listenApp } = UseApp();

  useEffect(() => {
    const unsub = listenUser();
    onCloseEventlistener();
    return () => {
      unsub?.();
    };
  }, []);

  useEffect(() => {
    const unsub = listenApp();
    return unsub;
  }, [user]);

  const onCloseEventlistener = () => {
    const onCloseHandler = function () {
      setOffline();
    };
    window.addEventListener("beforeunload", onCloseHandler);
  };
  return (
    <div
      className={" min-h-[100vh] overflow-hidden flex flex-col " + className}
    >
      <MainHeader className={headerCss} />
      {children}
    </div>
  );
}
