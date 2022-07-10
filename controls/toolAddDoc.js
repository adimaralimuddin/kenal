import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";

export default async function toolAdddoc(col_, data) {
  return await addDoc(collection(db, col_), {
    ...data,
    timestamp: serverTimestamp(),
  });
}
