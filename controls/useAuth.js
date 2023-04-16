import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase.config";

export async function test() {
  const provider = new GoogleAuthProvider();
  const authResult = await signInWithPopup(auth, provider);
  const user = authResult?.user;
  if (user) {
    const userDoc = await getDoc(doc(db, "users", user?.uid));
    if (!userDoc?._document) {
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
  }
}
