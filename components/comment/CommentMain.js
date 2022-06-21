import useComment from "../../controls/useComment"
import useUser from "../../controls/useUser"
import Writer from "../elements/Writer"



export default function CommentMain({ postId }) {
    const {user} = useUser()

   const {addComment,comments}= useComment(postId)
  return (
      <div>
          <button onClick={addComment}>add</button>
          <Writer user={ user} />
    </div>
  )
}


