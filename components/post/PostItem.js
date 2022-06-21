

import Box from "../elements/Box";
import UserItem from "../user/UserItem";
import usePost from '../../controls/usePost'
import ImgViewer from "../elements/ImgViewer";
import CommentMain from "../comment/CommentMain";
import LikeMain from "../reactions/LikeMain";
import Option from "../elements/Option";


export default function PostItem({ data }) {
  const { removePost } = usePost()
  const options =[{text:'delete',action:()=>removePost(data?.id)}]

  return (
      <Box className='flex flex-col m-0 p-0 text-gray-600 min-h-[300px] my-5'>
          <div className="flex justify-between items-center ">
              <UserItem userId={data?.userId} >
                  <small>12 minutes ago</small>
              </UserItem>
              <Option options={options } />
          </div>
      
          <div className="px-3 flex-1 ">
                <p>{data?.body}</p>
          </div>
          
          <ImgViewer imgs={data?.images} />
          <LikeMain col_='posts' likes={data?.likes} loves={ data?.loves} userId={data?.userId} docId={data?.id } />
              <CommentMain postId={ data?.id} />
    </Box>
  )
}


