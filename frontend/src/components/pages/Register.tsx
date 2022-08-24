import { ChangeEvent, FormEvent, useState } from "react";
import { IAdmin } from "../../models/IAdmin";
import { saveAdmin } from "../../services/adminService";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [role, setRole] = useState("");

  const createAdmin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newAdmin: IAdmin = {
      username: username,
      password: password,
      role: role,
    };
    saveAdmin(newAdmin);
  };

  // const emptyForm = () => {
  //   setUsername("");
  //   setPassword("");
  //   setConfirmPwd("");
  // };

  return (
    <>
      <h1>REGISTER NEW USER</h1>
      <form onSubmit={createAdmin}>
        <input
          type="text"
          autoComplete="off"
          placeholder="Username"
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
        <input
          type="password"
          placeholder="Confirm Password"
          autoComplete="off"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setConfirmPwd(e.target.value);
          }}
        />
        <button type="submit">Register new user</button>
      </form>
    </>
  );
}
