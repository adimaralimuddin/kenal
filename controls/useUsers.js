import { collection, getDocs } from "firebase/firestore"
import { useEffect } from "react"
import { db } from "../firebase.config"
import create from 'zustand'

const store_ = create(set => ({ set: data => set(data) }))

export default function useUsers() {
    const store = store_()
    const { set } = store;

    useEffect(() => {
        getUsers()
    },[])
    
    async function getUsers() {
        const x = await getDocs(collection(db, 'users'))
        const users = x.docs?.map(d => ({ ...d.data(), id: d.id }))
        set({users})
    }

    return {
      ...store,
  }
}
