import { addDoc, collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import create from 'zustand'
import { db } from '../firebase.config';
import toolPostAdder from './toolPostAdder';
import toolRemoveDoc from './toolRemoveDoc';
import useUser from './useUser';

const store_ = create(set => ({ set: data => set(data) }))
const commentDoc = id => doc(db, 'comments', id)
const commentsCol = collection(db,'comments')

export default function useComment(postId) {
    const store = store_()
    const { set } = store;
    const {user} = useUser()
    const [comments,setComments] = useState()

    useEffect(() => {
        if (!postId) return 
        const q = query(collection(db,'comments'),where('postId','==',postId))
        onSnapshot(q, snap => {
            setComments(snap?.docs?.map(d=>({...d.data(),id:d.id})))
        })
    },[postId])

    async function addComment(data_,clear) {

        const data = {
            postId,
            userId:user?.uid,
            body: data_?.body,
            status: 'public',
        }

        await toolPostAdder(data, data_?.imgs, 'comments', () => {
            clear()
       })
    }
    
    const removeComment = async(id)=>toolRemoveDoc('comments',id)

    return {
        ...store,
        comments,
        addComment,
        removeComment

    }
}


