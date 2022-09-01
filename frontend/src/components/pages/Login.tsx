import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IAdmin } from "../../models/IAdmin";
import { loginAdmin } from "../../services/adminService";
import { useNavigate } from "react-router-dom";
import { StyledGreenForm } from "../styled-components/Forms/StyledGreenForm";
import { StyledAdminButton } from "../styled-components/Buttons/StyledButtons";
import { StyledFlexDiv } from "../styled-components/Wrappers/StyledFlex";
import { useCookies } from "react-cookie";
import axios from "axios";
import { StyledSmallHeading } from "../styled-components/Headings/StyledHeadings";

export default function Login() {
  const [cookies] = useCookies(["jwt"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies["jwt"]) {
      console.log("TEST");
      navigate("/admin/start");
    }
  }, []);

  const [values, setValues] = useState({ email: "", password: "" });
  const generateError = (error: string) => {
    console.log(error);
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/admin",
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/admin/start");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <StyledFlexDiv padding="10rem">
        <StyledSmallHeading padding="1rem">LOG IN</StyledSmallHeading>
        <StyledGreenForm onSubmit={(e) => handleSubmit(e)}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="off"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setValues({ ...values, [e.target.name]: e.target.value });
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="off"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setValues({ ...values, [e.target.name]: e.target.value });
            }}
          />
          <StyledAdminButton type="submit">Log In</StyledAdminButton>
        </StyledGreenForm>
      </StyledFlexDiv>
    </>
  );
}
