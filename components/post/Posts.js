
import usePost from '../../controls/usePost'
import PostItem from './PostItem'

export default function Posts() {
  const {posts} = usePost()
    return (
      <div>
            {
                posts?.map(post => <PostItem data={post} key={ post?.id} />)
          }
    </div>
  )
}
