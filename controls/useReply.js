import { addDoc, collection, onSnapshot, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../firebase.config"
import toolRemoveDoc from "./toolRemoveDoc"


export default function useReply(commentId,userId) {
    
    const [replies, setReplies] = useState([])
    const [body,setBody]= useState('')
    
    useEffect(() => {
        if(!commentId)return
       const q = query(collection(db,'replies'))
        onSnapshot(q, snap => {
            setReplies(snap?.docs?.map(d=>({...d.data(),id:d.id})))
        }) 
    }, [commentId])
    
    async function addReply(data_,clear) {
        const data = { commentId, userId,body:data_?.body }
        console.log(data)
        await addDoc(collection(db, 'replies'), data)
        clear()
    }

    async function removeReply(id) {
        toolRemoveDoc('replies',id)
    }

    return {
        addReply,
        replies,
        removeReply
    }
}