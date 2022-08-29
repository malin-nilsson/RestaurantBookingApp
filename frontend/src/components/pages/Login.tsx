import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { IAdmin } from "../../models/IAdmin";
import { getAdmin } from "../../services/adminService";
import { loginAdmin } from "../../services/adminService";
import { AdminContext, IAdminContext } from "../../context/AdminContext";
import { useNavigate, Navigate } from "react-router-dom";
import { StyledGreenForm } from "../styled-components/Forms/StyledGreenForm";
import {
  StyledAdminButton,
  StyledButton,
} from "../styled-components/Buttons/StyledButtons";
import { StyledFlexDiv } from "../styled-components/Wrappers/StyledFlex";

export default function Admin() {
  const navigate = useNavigate();
  const shouldRedirect = true;

  // const [adminData, setAdminData] = useState<IAdminContext>({
  //   admin: [],
  //   updateContext: updateContext,
  // });

  // function updateContext(updatedContext: IAdminContext): void {
  //   setAdminData({ ...updatedContext });
  // }

  const [admin, setAdmin] = useState<IAdmin[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const adminCred: IAdmin = {
      username: username,
      password: password,
      role: "",
    };
    loginAdmin(adminCred);
    console.log(adminCred);
    if (shouldRedirect) {
      navigate("/admin/start");
    }
  };

  return (
    <>
      <StyledFlexDiv>
        <StyledGreenForm onSubmit={loginSubmit}>
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
          <StyledAdminButton type="submit">Log In</StyledAdminButton>
        </StyledGreenForm>
        <>
          {admin.map((admin) => {
            return <h1 key={admin.username}>{admin.username}</h1>;
          })}
        </>
      </StyledFlexDiv>
    </>
  );
}
