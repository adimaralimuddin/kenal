import useUser from "../../controls/useUser";
import Box from "../elements/Box";
import Form from "../elements/Form";
import LinkCreateAccount from "../elements/LinkCreateAccount";
import Modal from "../elements/Modal";

export default function UserLoginWithEmail({ open, set }) {
  const { LoginWIthEmail } = useUser();

  const onLoginWithEmailAndPassWord = (email, password, reset) => {
    LoginWIthEmail(email, password, () => {
      reset?.();
      location.replace("/feed");
    });
  };

  return (
    <Modal open={open} set={set}>
      <Box className="flex flex-col ">
        <Form onSubmit={onLoginWithEmailAndPassWord} />
        <h1 className="text-center">OR</h1>
        <LinkCreateAccount />
      </Box>
    </Modal>
  );
}
