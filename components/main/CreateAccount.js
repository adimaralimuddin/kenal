import Image from "next/image";
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
    <Mainlayout
      className="  bg-slate-100 dark:bg-slate-900 "
      headerCss={" bg-transparent"}
    >
      <div className="transition-colors duration-500 flex gap-12 flex-cold  flex-1 items-center  justify-center p-3 flex-wrap-reverse">
        {/* <MainImage className="md:block hidden" /> */}
        <div className="bg-pink-400 rounded-[10%] rotate-3 relative p-2 min-w-[300px]d max-w-[400px] w-full aspect-square ">
          <Image
            className=""
            src={"/hero-image3.png"}
            layout="fill"
            objectFit="contain"
            alt=""
          />
        </div>
        <div className=" box m-3 px-6 py-[30px] flex-1 max-w-md flex flex-col items-stretch  rounded-xl shadow-xl  ring-pink-300d  dark:ring-0">
          <Form
            onSubmit={onSubmitHandler}
            text="Create new account"
            btnText={"create account"}
          />

          <div className=" ring-1d flex flex-col px-4 border-t-[1px] border-slate-300 dark:border-d3 pt-2">
            <ButtonSec onClick={loginWithGoogle}>Signin With Google</ButtonSec>
          </div>
        </div>
      </div>
    </Mainlayout>
  );
}

export default CreateAccount;
