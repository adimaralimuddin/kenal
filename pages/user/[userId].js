import MainUserPage from "../../components/main/MainUserPage";



export default function UserId({params}) {
  return (
    <MainUserPage params={params}/>
  )
}

export async function getServerSideProps(context) {
    return {
        props: {
            params:context?.params
        }
    }
}