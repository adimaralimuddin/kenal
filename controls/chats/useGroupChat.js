import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import toolAddDoc from "../toolAddDoc";
import toolSnapToDoc from "../toolSnapToDoc";
// import toolUpdatedoc from "../toolUpdateDoc";
// import useUser from "../useUser";

const converseRef = collection(db, "converse");
const CONVERSE = "converse";
// const { user } = useUser();
const UseGroupChat = () => {
  async function createGroupChat(groupPayload) {
    console.log("create group chat");
    const groupAdded = await toolAddDoc(CONVERSE, {
      ...groupPayload,
      type: "group",
      //   userId: user?.uid,
      //   from: user?.uid,
    });
    console.log("added id", groupAdded);
    const docSnap = await getDoc(groupAdded);
    const createdConverse = toolSnapToDoc(docSnap);
    await setDoc(doc(db, "writer", groupAdded.id), {});
    console.log("got doc", createdConverse);
    console.log("writer added");
    return createdConverse;

    // toolAddDoc("writer", { id: groupAdded.id });
    // console.log("group added", groupAdded);
  }

  return { createGroupChat };
};

export default UseGroupChat;
