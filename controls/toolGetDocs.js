import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase.config";

export default async function toolGetDocs(
  col_,
  where_ = where(documentId(), "!=", "sdfsd")
) {
  const q = query(collection(db, col_), where_);
  const snap = await getDocs(q);
  return snap?.docs?.map((d) => ({ ...d.data(), id: d.id }));
}
