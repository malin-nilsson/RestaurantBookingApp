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

  const MAILERR = "Email already in use!";
  const PASSERR = "Password need to be at least 4 characters.";
  const CONFIRMPASS = "Password's don't match!";

  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // useEffect(() => {
  //   if (cookies["jwt"]) {
  //     navigate("/admin/start");
  //   }
  // }, [cookies, navigate]);

  const generateError = (error: string) => {
    console.log(error);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.password != values.confirmPassword) {
      setShowError(true);
      setErrorMsg(CONFIRMPASS);
    }
    if (values.password.length < 4) {
      setShowError(true);
      setErrorMsg(PASSERR);
    } else {
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
            const { email, password, confirmPassword } = data.errors;
            if (email) {
              setErrorMsg(MAILERR);
              generateError(email);
              setShowError(true);
            } else if (password) {
              setErrorMsg(PASSERR);
              generateError(password);
              setShowError(true);
            } else if (confirmPassword) {
              setErrorMsg(CONFIRMPASS);
              generateError(confirmPassword);
              setShowError(true);
            }
          } else {
            navigate("/admin/start");
          }
        }
      } catch (err) {
        console.log(err);
      }
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            autoComplete="off"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setValues({ ...values, [e.target.name]: e.target.value });
            }}
          />
          <StyledAdminButton type="submit">Register</StyledAdminButton>
          {showError && <StyledSmallHeading>{errorMsg}</StyledSmallHeading>}
        </StyledGreenForm>
      </StyledFlexDiv>
    </>
  );
}
