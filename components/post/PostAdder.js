


import Box from "../elements/Box";
import Avatar from "../elements/Avatar";
import useUser from '../../controls/useUser'
import IconBtn from '../elements/IconBtn'
import Icon from '../elements/Icon'
import usePost from "../../controls/usePost";
import ButtonPrimary from '../elements/ButtonPrim'
import ImgInput from "../elements/ImgInput";
import ImgEditor from "../elements/ImgEditor";

export default function PostAdder() {
  const { user } = useUser()
  const { set, body, addPost,imgs,posts,loading } = usePost()
  // console.log(imgs)
console.log(posts)
  return (
    <Box className='flex flex-col items-centerd  mx-auto px-2'>
      <div className="flex items-center flex-1">
        
          <Avatar div='m-0 mx-2' src={user?.photoURL} />
      <input onChange={e => set({ body: e.target.value })} value={body}                 className='flex-1 ring-0 text-gray-500 min-w-0' placeholder="What's new?" />
      </div>
      <div className="flex items-center">
        <ImgInput set={set} >
          <IconBtn >add_a_photo</IconBtn>
        </ImgInput>
        <IconBtn>videocam</IconBtn>
        <IconBtn>attach_file</IconBtn>
        <ButtonPrimary onClick={addPost}>Post</ButtonPrimary>
      </div>
      <ImgEditor imgs={imgs} set={set} />
      {loading?.toString()}
    </Box>
  )
}
