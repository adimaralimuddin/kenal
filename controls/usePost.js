
import { addDoc, arrayUnion, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { useEffect } from 'react';
import create from 'zustand'
import { db, storage } from '../firebase.config';
import toolPostAdder from './toolPostAdder';
import toolRemoveDoc from './toolRemoveDoc';
import useUser from './useUser';
const store_ = create(set => ({
    set: data => set(data)
}))

export default function usePost() {
    const store = store_()
    const { set ,body,imgs} = store;
    const { user } = useUser()
    
    useEffect(() => {
       const q = query(collection(db,'posts'),)
        onSnapshot(q, snap => {
            set({posts:snap?.docs?.map(d=>({...d?.data(),id:d?.id}))})
        }) 
    },[])
    
    async function addPost() {
        set({loading:true})

        const data = {
            status: 'public',
            body,
            userId: user?.uid,
            edited:false,
        }

        toolPostAdder(data, imgs, 'posts', () => {
                     if (ind=> imgs?.length) {
                    set({ imgs: null, body: '' })
                    set({loading:false})
                }
        })
    }

    async function removePost(id) {
        await toolRemoveDoc('posts',id)
        
    }

    return {
        ...store,
        addPost,removePost
    }
}


