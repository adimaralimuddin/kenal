import {
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase.config";
import toolRemoveFile from "./toolRemoveFile";

export default async function toolUpdatedoc(
  col_,
  docId,
  data,
  caller,
  errorer
) {
  try {
    const { images, imgLength, ...postData } = data;

   const result= await updateDoc(doc(db, col_, docId), {
      ...postData,
      updatedAt: serverTimestamp(),
    });
    console.log("doc updated");
    caller?.();

    if (images) {
      console.log("has imgs ", images);
      updateDoc(doc(db, col_, docId), {
        images: [],
        imgLength: images?.length || 0,
      });
      images?.map(async (img, ind) => {
        if (img?.file) {
          const stRef = ref(storage, `/files/${col_}/${docId}/${ind}`);
          const uploadTask = await uploadBytes(stRef, img?.file);
          const url = await getDownloadURL(uploadTask.ref);
          3;
          updateDoc(doc(db, col_, docId), {
            images: arrayUnion({ ind, url, type: img?.type }),
          });
        } else {
          updateDoc(doc(db, col_, docId), {
            images: arrayUnion({ ind, url: img?.url, type: img?.type }),
          });
        }
      });

      if (imgLength > images?.length) {
        const arr = [];
        for (let i = 0; i < imgLength; i++) {
          if (i > images?.length - 1) {
            arr?.push(i);
          }
        }
        arr?.map((ind) => {
          toolRemoveFile(`files/${col_}/${docId}/${ind}`);
        });
      } // end of if imgLength > images?.length
    }
  } catch (error) {
    console.log("toolUpdateDoc Error ", error);
    errorer?.(error);
  }
}
