import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase.config";

export async function test() {
  const provider = new GoogleAuthProvider();
  const x = await signInWithPopup(auth, provider);
  const user = x?.user;
  if (user) {
    const y = await getDoc(doc(db, "users", user?.uid));
    if (!y?._document) {
      const user_ = await setDoc(doc(db, "users", user?.uid), {
        userName: user?.displayName,
        avatar: user?.photoURL,
        createdAt: serverTimestamp(),
      });
      const profile = await setDoc(doc(db, "profile", user?.uid), {
        ...user?.providerData?.[0],
      });
      const relations = await setDoc(doc(db, "relations", user?.uid), {});
    }
    // window.location.replace(window.location.origin + "/feed");
  }
}
