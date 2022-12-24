import useUser from "../../controls/useUser";
import { MainImage } from "../../pages";
import { useAlert } from "../elements/Alert";
import ButtonSec from "../elements/ButtonSec";
import Form from "../elements/Form";
import Mainlayout from "./MainLayout";

function CreateAccount() {
  const { open } = useAlert();
  const { createUser, loginWithGoogle } = useUser();
  let pass = true;

  const checker = (email, password) => {
    if (password?.length <= 5) {
      pass = false;
      open("password should be more than 5 characters");
    }
  };

  const onSubmitHandler = (email, password, reset) => {
    checker(email, password);
    if (!pass) return;
    createUser(email, password, (createdUser) => {
      reset();
      location.replace("/feed");
    });
  };

  return (
    <Mainlayout className=" bg-[#f3e8df] dark:bg-[#15151c]">
      <div className="transition-colors duration-500 flex flex-cold md:flex-rowd flex-1 bg-[#f3e8df] dark:bg-[#15151c] items-center  justify-center p-3 flex-wrap-reverse">
        <MainImage className="md:block hidden" />
        <div className=" m-3 px-6 py-[30px] flex-1 max-w-sm flex flex-col items-stretch bg-[#f7f0ec] dark:bg-box-dark rounded-xl shadow-xl ring-1 ring-pink-300d ring-[#f3deec] dark:ring-0">
          <Form
            onSubmit={onSubmitHandler}
            text="Create new account"
            btnText={"create account"}
          />

          <div className=" ring-1d flex flex-col px-4 border-t-2 border-slate-300 dark:border-d3 pt-2">
            <ButtonSec onClick={loginWithGoogle}>Signin With Google</ButtonSec>
          </div>
        </div>
      </div>
    </Mainlayout>
  );
}

export default CreateAccount;
