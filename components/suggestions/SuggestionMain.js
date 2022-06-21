import useUsers from "../../controls/useUsers"
import Box from "../elements/Box"
import UserSugItem from "../user/UserSugItem"

export default function SuggestionMain() {
    const {users } = useUsers()
  return (
      <div>
          <Box className='min-h-[200px]'>
              {
                  users?.map(user_ => <UserSugItem data={user_} key={ user_?.id} />)
              }
          </Box>
    </div>
  )
}
