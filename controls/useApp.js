import useChatListeners from "./chats/useChatListeners";
import UseMessageRequest from "./chats/useMessageRequest";
import useNotifs from "./useNotifs";
import useRelations from "./useRelations";
import useSettings from "./useSettings";
import useUser from "./useUser";

const UseApp = () => {
  const { initRelation } = useRelations();
  const { listen: listenSettings } = useSettings();
  const { listen: listenNotifs } = useNotifs();
  const { listenChatNotifs } = useChatListeners();
  const { listenRequest } = UseMessageRequest();

  const { user } = useUser();

  const listen = () => {
    if (!user) return console.log("no user");
    const unsubRelations = initRelation();
    const unsubSettings = listenSettings();
    const unsubNotifs = listenNotifs();
    const unsubChatNotfs = listenChatNotifs();
    const unsubMessages = listenRequest();

    return () => {
      unsubRelations?.();
      unsubSettings?.();
      unsubNotifs?.();
      unsubChatNotfs?.();
      unsubMessages?.();
    };
  };
  return { listen };
};

export default UseApp;
