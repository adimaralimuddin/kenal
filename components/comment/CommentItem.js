import Box from "../elements/Box";
import ImgViewer from "../elements/ImgViewer";
import Option from "../elements/Option";
import LikeMain from "../reactions/LikeMain";
import ReplyMain from "../reply/ReplyMain";
import UserItem from "../user/UserItem";



export default function CommentItem({ data, onDelete }) {
    
    const options = [{ text: 'Delete', action: () => onDelete(data?.id) }]
    
  return (
      <Box className='p-0 m-0'>
          <div className="flex items-center justify-between">
              <UserItem userId={data?.userId} className=' py-0'/>
              <Option options={ options} />
      </div>
      <div className="ml-16 px-2">
          <p className=" ">{data?.body}</p>
          <ImgViewer imgs={data?.images} />
        <LikeMain userId={data?.userId} docId={data?.id} col_='comments' likes={data?.likes} loves={data?.loves} />
        <ReplyMain userId={ data?.userId} commentId={data?.id} />
      </div>
    </Box>
  )
}




