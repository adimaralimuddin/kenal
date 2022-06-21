import UserMainMenu from "../others/UserMainMenu";

export default function MainHeader() {
  return (
      <div className="bg-white  shadow-sm  ">
          <div className="max-w-5xl  mx-auto p-2 flex justify-between items-center ">
              <h1>Kenal</h1>
              <UserMainMenu/>
          </div>
    </div>
  )
}
