import MainUserPage from "../../components/main/MainUserPage";
import MainLayout from "../../components/main/MainLayout";

export default function UserId({ params }) {
  return (
    <MainLayout>
      <MainUserPage params={params} />
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      params: context?.params,
    },
  };
}
