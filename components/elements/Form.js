import React, { useState } from "react";
import ButtonPrim from "./ButtonPrim";
import InputPassword from "./InputPassword";

export default function Form({
  onSubmit,
  email: email_,
  password: password_,
  text,
  btnText,
}) {
  const [email, setEmail] = useState(email_);
  const [password, setPassword] = useState(password_);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    onSubmit(email, password, reset);
  };

  function reset() {
    setEmail("");
    setPassword("");
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col m-4"
    >
      <h2 className="text-xl font-semibold text-slate-600  dark:text-slate-400">
        {text || "Login with email address"}
      </h2>
      <div className="flex flex-col my-3 text-slate-600 dark:text-slate-400">
        <input
          className="bg-transparent ring-1 ring-slate-300 dark:ring-d1"
          onInput={(e) => setEmail(e.target?.value)}
          value={email}
          placeholder="email"
          type={"email"}
          required
        />
        <InputPassword
          onInput={(e) => setPassword(e.target?.value)}
          value={password}
        />
      </div>
      <ButtonPrim type="submit" className="mt-0 mb-0 max-w-lg" active={true}>
        {btnText || "Login"}
      </ButtonPrim>
    </form>
  );
}
