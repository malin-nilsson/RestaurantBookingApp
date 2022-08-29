import { ChangeEvent, FormEvent, useState } from "react";
import { IAdmin } from "../../models/IAdmin";
import { registerAdmin } from "../../services/adminService";
import { useCookies } from "react-cookie";
import { tokenToString } from "typescript";
import { StyledGreenForm } from "../styled-components/Forms/StyledGreenForm";
import { StyledAdminButton } from "../styled-components/Buttons/StyledButtons";
import { StyledFlexDiv } from "../styled-components/Wrappers/StyledFlex";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [role, setRole] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["test"]);

  const createAdmin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newAdmin: IAdmin = {
      username: username,
      password: password,
      role: role,
    };
    registerAdmin(newAdmin);
  };

  function onChange(newName: string) {
    setCookie("test", newName, { path: "/" });
  }

  // const [formData, setFormData] = useState({
  //   username: "",
  //   password: "",
  //   confirmPassword: "",
  //   role: "",
  // })

  // const {username, password, confirmPassword, role} = formData

  return (
    <>
      <StyledFlexDiv>
        <h1>REGISTER NEW USER</h1>
        <StyledGreenForm onSubmit={createAdmin} name={cookies.test}>
          <input
            type="text"
            // name="username"
            // value={username}
            autoComplete="off"
            placeholder="Username"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="password"
            // name="password"
            // value={password}
            placeholder="Password"
            autoComplete="off"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          />
          <input
            type="password"
            // name="confirmPassword"
            // value={confirmPassword}
            placeholder="Confirm Password"
            autoComplete="off"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setConfirmPwd(e.target.value);
            }}
          />
          <StyledAdminButton type="submit">Register new user</StyledAdminButton>
        </StyledGreenForm>
      </StyledFlexDiv>
    </>
  );
}
