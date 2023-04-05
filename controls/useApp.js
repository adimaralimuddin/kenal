import UseMessageRequest from "./chats/useMessageRequest";
import useNotifs from "./useNotifs";
import useRelations from "./useRelations";
import useSettings from "./useSettings";
import useUser from "./useUser";

const UseApp = () => {
  const { initRelation } = useRelations();
  const { listen: listenSettings } = useSettings();
  const { listen: listenNotifs } = useNotifs();
  const { listenRequest: listenChatNotifs } = UseMessageRequest();
  const { user } = useUser();

  const listen = () => {
    if (!user) return console.log("no user");
    const unsubRelations = initRelation();
    const unsubSettings = listenSettings();
    const unsubNotifs = listenNotifs();
    const unsubChatNotfs = listenChatNotifs();

    return () => {
      unsubRelations?.();
      unsubSettings?.();
      unsubNotifs?.();
      unsubChatNotfs?.();
    };
  };
  return { listen };
};

export default UseApp;
