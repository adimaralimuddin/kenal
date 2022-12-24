import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect } from "react";
import { auth, db } from "../firebase.config";
import create from "zustand";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import toolGetDoc from "./toolGetDoc";
import toolUpdatedoc from "./toolUpdateDoc";
import { useAlert } from "../components/elements/Alert";
const store_ = create((set) => ({ loaded: false, set: (data) => set(data) }));

const userRef = (id) => doc(db, "users", id);
const usersRef = collection(db, "users");

export default function useUser() {
  const store = store_();
  const { set, user } = store;
  const { open, close, pop } = useAlert();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      set({ user, loaded: true });
      if (user) {
        getDoc(userRef(user?.uid), (snap) => {
          if (snap?._document) {
            console.log("got", snap);
            try {
              setDoc(
                userRef(user?.uid),
                {
                  online: true,
                  onlineAt: new Date(),
                },
                { merge: true }
              );
            } catch (error) {
              console.log("authStateChanged error ", error);
            }
          }
        });
      }
    });
    return () => unsub();
  }, []);

  async function logout() {
    open("loging out . . .", true);
    const checkUser = await getDoc(userRef(user?.uid));
    if (checkUser?._document) {
      await toolUpdatedoc("users", user?.uid, {
        online: false,
        offlineAt: new Date(),
      });
    }
    await signOut(auth);
    pop("loged out.");
  }

  async function LoginWIthEmail(email, password, passCaller, errorCaller) {
    try {
      open("loging in . . .", true);
      const user = await signInWithEmailAndPassword(auth, email, password);
      open("redirecting . . .", true);
      passCaller?.(user);
    } catch (error) {
      open(
        "no user found. try to create new account or choose from the demo accounts below. or you can also login with google."
      );
      errorCaller?.(error);
    }
  }

  async function createUser(email, password, passCaller, errorCaller) {
    open("creating user account . . .", true);
    try {
      const createdUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = createdUser?.user;
      if (user) {
        open("getting account ready. . .", true);
        await createUserCreds(user);
        pop("account created successfully", undefined, undefined, () => {
          open("redirecting . . .", true);
          passCaller?.(user);
        });
      } else {
      }
    } catch (error) {
      console.log("error ", error?.message);
      if (error?.message?.includes("email-already-in-use")) {
        open("email already in used. please try a different and valid email.");
      } else {
        open(
          "there is an error in creating the account. check if email is valid or just try again later."
        );
      }
      errorCaller?.(error);
    }
  }

  async function loginWithGoogle(passer, errorer) {
    open("sign in with your google account on pop up window.");
    const provider = new GoogleAuthProvider();
    const x = await signInWithPopup(auth, provider);
    const user = x?.user;

    try {
      if (user) {
        open("checking user . . . ", true);
        const recorededUser = await getDoc(userRef(user?.uid));

        if (!recorededUser?._document) {
          open("preparing user account . . .", true);
          await createUserCreds(user);
          passer?.(user);
        } else {
          open("redirecting . . .", true);
          passer?.(user);
        }
      }
    } catch (error) {
      open(
        "there is an error signing in. please check your account or try again later"
      );
      errorer?.(error);
    }
  }

  async function createUserCreds(user) {
    const user_ = await setDoc(userRef(user?.uid), {
      userName: user?.displayName || user?.email?.split("@")?.[0],
      avatar: user?.photoURL,
      timestamp: serverTimestamp(),
      online: true,
      onlineAt: new Date(),
    });

    const profile = await setDoc(doc(db, "profile", user?.uid), {
      ...user?.providerData?.[0],
      displayName: user?.displayName || user?.email,
      joinedAt: new Date(),
      timestamp: serverTimestamp(),
    });

    const relations = await setDoc(doc(db, "relations", user?.uid), {});
    // console.log("relations created");

    const settings = await setDoc(
      doc(db, "settings", user?.uid),
      {
        // privacy default setting
        seeFuturePost: "Followers",
        seeFollowedPeople: "Followers",
        seeFollowers: "Followers",
        postToProfile: "Only_me",
        seeOtherPost: "Only_me",
        seeOtherStories: "Followers",
        commentPost: "Followers",
        commentStory: "Followers",
        comment: "Followers",
        seeAbout: "Only_me",
        canChat: "Followers",
        // notification default setting
        notifreactpost: true,
        notifcommentpost: true,
        notifsharepost: true,
        notifpostprofile: true,
        // notif comments
        notifreactcomment: true,
        notifreplycomment: true,
        // notif replies
        notifreactreply: true,
        notifmention: true,
        // notif tags
        notiftaggedpost: true,
        notiffollow: true,
        notifunfollow: true,
        //chat notifs
        chatNotif: true,

        //block users, post, stories, chat
        blockedposts: [],
        blockedusers: [],
        blockedstories: [],
        blockedchats: [],
      },
      { merge: true }
    );
    console.log("settings created");
  }

  async function getUser(userId, setter) {
    const user_ = await toolGetDoc("users", userId);
    setter(user_);
    return user_;
  }

  function listenUser(userId, caller) {
    return onSnapshot(userRef(userId), (doc) => {
      caller?.({ ...doc?.data(), id: doc?.id });
    });
  }

  return {
    ...store,
    logout,
    loginWithGoogle,
    LoginWIthEmail,
    createUser,
    getUser,
    listenUser,
  };
}
