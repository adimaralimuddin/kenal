import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";

export default async function toolGetDoc(col_, docId, passer) {
  const d = await getDoc(doc(db, col_, docId));
  if (!d?._document) return null;
  const ret = { ...d?.data(), id: d?.id };
  passer?.(ret);
  return ret;
}
