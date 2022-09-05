import { ChangeEvent, FormEvent, useEffect, useState } from "react";
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

  const LOGINERR = "Wrong credentials";

  const [values, setValues] = useState({ email: "", password: "" });
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (cookies["jwt"]) {
      navigate("/admin/start");
    }
  }, [cookies, navigate]);

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
          if (email) {
            generateError(email);
            setShowError(true);
            setErrorMsg(LOGINERR);
          } else if (password) {
            generateError(password);
            setShowError(true);
            setErrorMsg(LOGINERR);
          }
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
          {showError && <StyledSmallHeading>{errorMsg}</StyledSmallHeading>}
        </StyledGreenForm>
      </StyledFlexDiv>
    </>
  );
}
