import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase.config";

export default async function toolGetDocs(col_, ...queries) {
  const q = query(collection(db, col_), ...queries);
  const snap = await getDocs(q);
  return snap?.docs?.map((d) => ({ ...d.data(), id: d.id }));
}
