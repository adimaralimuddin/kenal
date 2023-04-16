import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase.config";

export default async function toolPostAdder(
  data,
  imgs,
  col_ = "posts",
  call = () => {}
) {
  // const { user } = useUser();
  const addedDoc = await addDoc(collection(db, col_), {
    ...data,
    timestamp: serverTimestamp(),
  });
  call?.(addedDoc);

  if (imgs) {
    updateDoc(doc(db, col_, addedDoc?.id), {
      imgLength: imgs?.length || 0,
    });

    imgs?.map(async (img, ind) => {
      const stRef = ref(storage, `/files/${col_}/${addedDoc?.id}/${ind}`);
      const uploadTask = await uploadBytes(stRef, img?.file);
      const url = await getDownloadURL(uploadTask.ref);
      updateDoc(doc(db, col_, addedDoc?.id), {
        images: arrayUnion({ ind, url, type: img?.type }),
      });
    });
  }

  return addedDoc;
}
