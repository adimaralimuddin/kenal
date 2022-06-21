import Box from "../elements/Box";
import Option from "../elements/Option";
import LikeMain from "../reactions/LikeMain";
import UserItem from "../user/UserItem";



export default function ReplyItem({ data, onDelete }) {
    
    const options = [{text:'delete',action:()=>onDelete(data?.id)}]
  return (
      <Box className='m-0 p-0 '> 
          <div className="flex items-center justify-between">
            <UserItem userId={data?.userId} />
            <Option options={ options} />
          </div>
          <div className="ml-16">
              <p>
                  { data?.body}
              </p>
              <LikeMain col_='replies' userId={data?.userId} docId={data?.id} likes={data?.likes} loves={ data?.loves} />      
          </div>
    </Box>
  )
}
