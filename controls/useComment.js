import { addDoc, collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import create from 'zustand'
import { db } from '../firebase.config';

const store_ = create(set => ({ set: data => set(data) }))
const commentDoc = id => doc(db, 'comments', id)
const commentsCol = collection(db,'comments')

export default function useComment(postId) {
    const store = store_()
    const { set } = store;
    const [comments,setComments] = useState()

    useEffect(() => {
        if (!postId) return 
        console.log(postId)
        const q = query(collection(db,'comments'),where('postId','==',postId))
        onSnapshot(q, snap => {
            console.log(snap)
            setComments(snap?.docs?.map(d=>({...d.data(),id:d.id})))
        })
    },[postId])

    async function addComment() {
        const data = {
            postId, body: '',
            status: 'public',
       }
        const x = await addDoc(commentsCol, data)
        console.log(x)
   }

    return {
        ...store,
        comments,
        addComment

    }
}

