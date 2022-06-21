
import { addDoc, arrayUnion, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { useEffect } from 'react';
import create from 'zustand'
import { db, storage } from '../firebase.config';
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
        // console.log({ data })
        const x = await addDoc(collection(db, 'posts'), data)
        if (imgs) {
            imgs?.map(async (img,ind) => {
                const stRef = ref(storage, `/files/posts/${x?.id}/${ind}`)
                const uploadTask = await uploadBytes(stRef, img?.file)
                const url = await getDownloadURL(uploadTask.ref)
                updateDoc(doc(db, 'posts', x?.id), { images: arrayUnion({ ind, url }) })
                if (ind=> imgs?.length) {
                    set({ imgs: null, body: '' })
                    set({loading:false})
                }
            })
        } else {
            set({loading:false})
        }
    
    }

    async function removePost(id) {
        const x = await deleteDoc(doc(db, 'posts', id))
    }

    return {
        ...store,
        addPost,removePost
    }
}


