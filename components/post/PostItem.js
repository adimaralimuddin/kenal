

import Box from "../elements/Box";
import Icon from "../elements/Icon";
import UserItem from "../user/UserItem";
import usePost from '../../controls/usePost'
import ImgViewer from "../elements/ImgViewer";
import CommentMain from "../comment/CommentMain";


export default function PostItem({ data }) {
    const {removePost} = usePost()

  return (
      <Box className='m-0 p-0 text-gray-600 min-h-[300px] my-5'>
          <button onClick={_=>removePost(data?.id)}>x</button>
          <div className="flex justify-between items-center">
              <UserItem userId={data?.userId} >
                  <small>12 minutes ago</small>
              </UserItem>
              <Icon className='mx-2'>more_horiz</Icon>
          </div>
          <div className="px-3">
              
            <p>{data?.body}</p>
          </div>
          <ImgViewer imgs={data?.images} />
          <CommentMain postId={ data?.id} />
    </Box>
  )
}


