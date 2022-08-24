import { ChangeEvent, FormEvent, useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <h1>LOGIN</h1>
      <form onSubmit={loginSubmit}>
        <input
          type="text"
          placeholder="Username"
          autoComplete="off"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="off"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Log in</button>
      </form>
    </>
  );
}
