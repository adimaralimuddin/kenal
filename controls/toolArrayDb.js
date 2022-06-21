import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";


export async function toolArrayUnion(col_,docId,field,data) {
     return await  updateDoc(doc(db,col_,docId),{[field]:arrayUnion(data)})
}

export async function toolArrayRemove(col_, docId, field, data) {
     return await  updateDoc(doc(db,col_,docId),{[field]:arrayRemove(data)})
}

