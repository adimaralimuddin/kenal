import Avatar from "../elements/Avatar";
import Icon from "../elements/Icon";


export default function UserSugItem({ data }) {
    const { userName,avatar } = data;
  return (
    <div className="flex items-center text-gray-500">
      <div className="flex-1 flex items-center">

          <Avatar src={avatar}/>
          <h3 className="mx-1">{userName}</h3>
      </div>
          <Icon className='ml-5'>person_add</Icon>
    </div>
  )
}
