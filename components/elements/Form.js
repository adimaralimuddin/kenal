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
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-2 m-4">
      <h2 className="text-xl font-semibold text-slate-600  dark:text-slate-400">
        {text || "Login with email address"}
      </h2>
      <div className="flex my-3 flex-col gap-3 text-slate-600 dark:text-slate-400">
        <input
          className="bg-transparent ring-1 ring-slate-300 text-base px-3 p-2"
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
      <button
        type="submit"
        className="mt-0 mb-0 max-w-lg btn-prime text-base"
        active={true}
      >
        {btnText || "Login"}
      </button>
    </form>
  );
}
