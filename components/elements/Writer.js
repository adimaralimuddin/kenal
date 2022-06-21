import IconBtn from "./IconBtn";
import ButtonPrim from './ButtonPrim'
import Avatar from "./Avatar";
import { useState } from "react";
import ImgInput from "./ImgInput";
import ImgEditor from "./ImgEditor";


export default function Writer({ text = 'post', onPost, user }) {
    
    const [body, setBody] = useState()
    const [imgs,setImgs]=useState({imgs:[]})

    const handlePost = () => {
        const data = { body, imgs:imgs?.imgs }
        onPost(data,clear)
    }

    function clear() {
        setImgs({ imgs: [] })
        setBody('')
    }

  return (
      <div>
          <div className="flex w-full items-center px-2">
          <Avatar src={ user?.photoURL} />
          <input value={body} onInput={e=>setBody(e.target?.value)}
              className="flex-1 min-w-[100px]" placeholder={"Write a " + text + ' ...'} />
          <ImgInput set={setImgs}>
              <IconBtn>add_a_photo</IconBtn>
          </ImgInput>
          <ButtonPrim onClick={handlePost}>Post</ButtonPrim>
              </div>
          <div>
              <ImgEditor imgs={imgs?.imgs} set={ setImgs} />
          </div>
    </div>
  )
}




