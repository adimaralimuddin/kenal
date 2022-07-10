import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";

export default async function toolUpdatedoc(col_, docId, data) {
  try {
    updateDoc(doc(db, col_, docId), { ...data, updatedAt: serverTimestamp() });
  } catch (error) {}
}
