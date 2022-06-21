import { useState } from "react"
import useReply from "../../controls/useReply"
import useUser from "../../controls/useUser"
import Writer from "../elements/Writer"
import ReplyItem from "./ReplyItem"



export default function ReplyMain({ userId, commentId }) {
    const { user } = useUser()
    const [open,setOpen] = useState(false)
    const { replies, addReply,removeReply } = useReply(commentId, userId)
  return (
      <div>
          <p onClick={_=>setOpen(p=>!p)} className=" text-end cursor-pointer  -mt-8 mb-3">{ replies?.length || ''} replies</p>
          {open && <Writer onPost={addReply} user={user} text='reply' />}
         {open && <div >
              {
                  replies?.map(reply => <ReplyItem
                      data={reply}
                      onDelete={ removeReply}
                      key={reply?.id} />)
              }
          </div>}
    </div>
  )
}
