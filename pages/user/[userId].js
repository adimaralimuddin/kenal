import MainLayout from "../../components/main/MainLayout";
import MainUserPage from "../../components/main/MainUserPage";

export default function UserId({ params }) {
  return (
    <MainLayout>
      <div className="flex flex-col justify-center ring-1 p-4 items-center">
        <div className="w-full max-w-4xl">
          <MainUserPage params={params} />
        </div>
      </div>
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
