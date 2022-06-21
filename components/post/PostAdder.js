


import Box from "../elements/Box";
import Avatar from "../elements/Avatar";
import useUser from '../../controls/useUser'
import IconBtn from '../elements/IconBtn'
import Icon from '../elements/Icon'
import usePost from "../../controls/usePost";
import ButtonPrimary from '../elements/ButtonPrim'
import ImgInput from "../elements/ImgInput";

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


function ImgEditor({ imgs, set,name='imgs' }) {
  
  function onRemove(file) {
    const nImgs = imgs?.filter(i => i !== file)
    set({[name]:nImgs})
  }

  return (
    <div className="flex flex-wrap max-h-[300px] overflow-y-auto">
    {
        imgs?.map(file => (
          <div onClick={_ => onRemove(file)}
            className="cursor-pointer overflow-hidden min-w-[100px] min-h-[100px] bg-cover bg-no-repeat bg-center m-1 rounded-md" style={{ backgroundImage: `url('${file?.url}')` }}>
              <Icon className='text-xl opacity-0 hover:opacity-100 bg-opacity-30 m-0 bg-blue-900 w-full h-full flex items-center justify-center text-white '> close</Icon>
        </div>
      ))
    }
  </div>
  )
}


