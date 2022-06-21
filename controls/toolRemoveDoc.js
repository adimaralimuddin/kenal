import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";


export default async function toolRemoveDoc(col_,id) {
   return await deleteDoc(doc(db,col_, id))
}

