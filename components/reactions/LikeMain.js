import useReaction from "../../controls/useReaction";
import Icon from "../elements/Icon";



export default function LikeMain({userId,docId,likes,loves,col_}) {

    const { like, love } = useReaction()
    
  return (
      <div className="flex items-center ">
          
          <button
              className='flex items-center min-w-[70px]'
              onClick={_ => like(docId, userId,likes,col_)} >
              <Icon className={likes?.find(i => i == userId) && 'text-gray-800'}>
                  <span class="material-symbols-outlined">thumb_up</span>
              </Icon>
              <small>
                 {likes?.length || '' }
              </small>
          </button>

          <button className="flex items-center min-w-[70px]"
           onClick={_ => love(docId, userId,loves,col_)}>
          <Icon>favorite</Icon>
              <small>
                 {loves?.length || ''}
              </small>
          </button>
          
    </div>
  )
}


