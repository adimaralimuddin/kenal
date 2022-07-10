import PostDetailPage from "../../components/post/PostDetailPage";

export default function postDetail({ postId }) {
  return <PostDetailPage postId={postId} />;
}

export function getServerSideProps(context) {
  console.log(context.params);
  return {
    props: {
      postId: context?.params?.postId,
    },
  };
}
