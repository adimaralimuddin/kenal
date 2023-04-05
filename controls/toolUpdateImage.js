import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase.config";

export default async function toolUpdateImage(col_, docId, field, file, call) {
  const stRef = ref(storage, `/files/${col_}/${docId}/${field}`);
  const uploadTask = await uploadBytes(stRef, file);
  const url = await getDownloadURL(uploadTask.ref);
  await updateDoc(doc(db, col_, docId), { [field]: url });
  call?.();
}
