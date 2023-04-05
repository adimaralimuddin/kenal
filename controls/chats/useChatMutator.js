import app from "../app";
import toolAddDoc from "../toolAddDoc";
import useUser from "../useUser";

const useChatMutator = () => {
  const { user } = useUser();
  async function createPrivateConverse({ user: toUser, meta }) {
    const data = {
      userId: user.uid,
      to: toUser.id,
      from: user.uid,
      type: "private",
      members: [user.uid, toUser.id],
    };
    const converseCreated = await toolAddDoc(app.db.converse, data);
    console.log("crea", converseCreated);
  }
  return { createPrivateConverse };
};

export default useChatMutator;
