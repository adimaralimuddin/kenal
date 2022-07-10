import { deleteObject, ref } from "firebase/storage";
import { storage } from "../firebase.config";

export default async function toolRemoveFile(path) {
  const stRef = ref(storage, path);
  deleteObject(stRef);
}
