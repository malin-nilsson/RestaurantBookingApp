import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { StyledGreenForm } from "../styled-components/Forms/StyledGreenForm";
import { StyledAdminButton } from "../styled-components/Buttons/StyledButtons";
import { StyledFlexDiv } from "../styled-components/Wrappers/StyledFlex";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { StyledSmallHeading } from "../styled-components/Headings/StyledHeadings";

export default function Register() {
  const [cookies] = useCookies(["jwt"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies["jwt"]) {
      navigate("/admin/start");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ email: "", password: "" });
  const generateError = (error: string) => {
    console.log(error);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/admin/register",
        {
          ...values,
        },
        {
          withCredentials: true,
        }
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
        <StyledSmallHeading padding="1rem">
          REGISTER NEW USER
        </StyledSmallHeading>
        <StyledGreenForm
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
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
          {/* <input
            type="password"
            placeholder="Confirm Password"
            autoComplete="off"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setConfirmPwd(e.target.value);
            }}
          /> */}
          <StyledAdminButton type="submit">Register</StyledAdminButton>
        </StyledGreenForm>
      </StyledFlexDiv>
    </>
  );
}
