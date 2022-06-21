import useComment from "../../controls/useComment"
import useUser from "../../controls/useUser"
import Writer from "../elements/Writer"
import CommentItem from "./CommentItem"



export default function CommentMain({ postId }) {
    const {user} = useUser()

    const { addComment, comments, removeComment } = useComment(postId)

    return (
      <div>
              <p className="text-end px-2 mb-3 float-right text-gray-500 -mt-8 ">{comments?.length || ''} comments</p>
          <Writer onPost={addComment} text='comment' user={user} />
          <div>
              {
                  comments?.map(comment => <CommentItem
                      onDelete={removeComment}
                      data={comment}
                      key={comment?.id}
                  />)
              }
          </div>
    </div>
  )
}


