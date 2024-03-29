import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";

export default async function toolRemoveDoc(col_, id, caller) {
  const ret = await deleteDoc(doc(db, col_, id));
  caller?.(id);
  return id;
}
