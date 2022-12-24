import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useState } from "react";
import usePost from "../controls/usePost";
import { db, storage } from "../firebase.config";

export default function VideoTest({ col_, data, save }) {
  // const [videos, setVideos] = useState([]);
  const { set, vids, uploadVids, uploadedPost } = usePost();
  // const [save, setSave] = useState(false);

  const inInputHandler = (e) => {
    const files = Array.from(e.target?.files)?.map((y, ind) => ({
      ind,
      url: URL.createObjectURL(y),
      file: y,
    }));
    // setVideos(files);
    set({ vids: files });
  };

  return (
    <div>
      <input
        className="w-[100px]"
        multiple
        type="file"
        accept="video/*"
        onInput={inInputHandler}
      />
      <div className="flex gap-1">
        {vids?.map((v, ind) => (
          <UploadItem
            vid={v}
            save={uploadVids}
            uploadedPost={uploadedPost}
            set={set}
            key={ind}
          />
        ))}
      </div>
    </div>
  );
}

function UploadItem({ vid, save, uploadedPost, set }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [task, setTask] = useState(null);
  const [state, setState] = useState("");

  useEffect(() => {
    if (save) {
      console.log("start uploading");
      setUploading(true);
      onSave();
    }
  }, [save]);

  const onSave = () => {
    if (!uploadedPost) return console.log("no uploadedPost ", uploadedPost);

    // console.log("uploadedPost ", uploadedPost);

    const stRef = ref(storage, `/files/posts/${uploadedPost}/vids/${vid?.ind}`);

    // console.log("uploading ", stRef);
    const uploadTask = uploadBytesResumable(stRef, vid?.file);
    setTask(uploadTask);
    uploadTask.on(
      "state_changed",
      (snap) => {
        const prog = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(prog);
        setState(snap.state);
      },
      (error) => {
        console.log("error ", error);
      },
      async (ret) => {
        // setUploaded(true);
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        updateDoc(doc(db, "posts", uploadedPost), {
          vids: arrayUnion({ ind: vid?.ind, url }),
        });
        set({ uploadVids: false });
        console.log("done");
      }
    );
  };

  if (!uploading) {
    return (
      <div className="flex-1 max-w-[150px] h-[100px]">
        <video controls className="h-full bg-cover bg-red object-cover ">
          <source src={vid?.url} />
        </video>
      </div>
    );
  }

  return (
    <div
      onClick={() => (state == "running" ? task?.pause() : task?.resume())}
      className="cursor-pointer ring-1 ring-slate-300 dark:ring-slate-600  overflow-hidden rounded-md relative max-w-[110px] h-[80px]"
    >
      <div className="text-slate-200 flex flex-col items-center justify-center absolute top-0 left-0 w-[30%]d w-full h-full bg-black bg-opacity-40">
        <h1 className="text-3xl font-semibold">{Math.floor(progress)} %</h1>
        <p>{state == "paused" && "paused"}</p>
      </div>
      <video
        autoPlayd
        className="h-full bg-cover brightness-75d saspect-square"
        controlsd
        style={{ objectFit: "cover" }}
      >
        <source src={vid?.url} />
      </video>
    </div>
  );
}
