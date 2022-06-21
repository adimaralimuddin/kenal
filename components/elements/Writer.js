import IconBtn from "./IconBtn";
import ButtonPrim from './ButtonPrim'
import Avatar from "./Avatar";


export default function Writer({text='post',onInput,user}) {
  return (
      <div className="flex items-center px-2">
          <Avatar src={ user?.photoURL} />
          <input onInput={onInput}
              className="flex-1" placeholder={"Write a " + text + ' ...'} />
          <IconBtn>add_a_photo</IconBtn>
          <ButtonPrim>Post</ButtonPrim>
        </div>
  )
}
