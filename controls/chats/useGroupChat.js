import { addDoc, arrayUnion, collection } from "firebase/firestore";
import { db } from "../../firebase.config";
import toolAddDoc from "../toolAddDoc";
import toolUpdatedoc from "../toolUpdateDoc";
import useUser from "../useUser";

const converseRef = collection(db, "converse");
const CONVERSE = "converse";
// const { user } = useUser();
const UseGroupChat = () => {
  async function createGroupChat(groupPayload) {
    const groupAdded = await toolAddDoc(CONVERSE, {
      ...groupPayload,
      type: "group",
      //   userId: user?.uid,
      //   from: user?.uid,
    });
    console.log("group added", groupAdded);
  }

  return { createGroupChat };
};

export default UseGroupChat;
