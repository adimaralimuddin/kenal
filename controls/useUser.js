import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth"
import { useEffect } from "react"
import { auth } from "../firebase.config"
import create from 'zustand'
const store_ = create(set=>({set:data=>set(data)}))


export default function useUser() {
    const store = store_()
    const { set } = store;
    
    useEffect(() => {
      const unsub =   onAuthStateChanged(auth, user => {
            set({user})
      })
        return  ()=>unsub()
    },[])
    
    function logout() {
    signOut(auth)
    }
    
    async function loginWithGoogle() {
        const provider = new GoogleAuthProvider()
        await signInWithPopup(auth,provider)
    }

    return {...store,logout,loginWithGoogle}
}