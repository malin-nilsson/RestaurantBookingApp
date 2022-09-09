import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { StyledGreenForm } from "../styled-components/Forms/StyledGreenForm";
import { StyledAdminButton } from "../styled-components/Buttons/StyledButtons";
import { StyledFlexDiv } from "../styled-components/Wrappers/StyledFlex";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  StyledMediumHeading,
  StyledSmallHeading,
} from "../styled-components/Headings/StyledHeadings";
import AdminPermission from "../admin-components/AdminPermission";
import AdminComplete from "../admin-components/AdminComplete";
import { StyledLoader } from "../styled-components/Loader/StyledLoader";

export default function Register() {
  const navigate = useNavigate();

  const MAILERR = "Email already in use!";
  const PASSERR = "Password must be at least 4 characters!";
  const CONFIRMERR = "Password's don't match!";
  const SHORTERR = "Password must be at least 4 characters!";

  const [inProgress, setInProgress] = useState(true);
  const [loader, setLoader] = useState(false);
  const [showComplete, setShowComplete] = useState(true);

  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    tooShort: "",
  });

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/admin");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000/admin",
          {},
          { withCredentials: true }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/admin");
        } else {
          if (data.role === "user") {
            setIsAdmin(false);
            return <AdminPermission />;
          } else {
            if (data.role === "admin") {
              setIsAdmin(true);
            }
          }
        }
      }
    };

    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const generateError = (error: string) => {
    console.log(errorMsg);
  };

  const stopLoader = () => {
    setLoader(false);
    setShowComplete(true);
    setInProgress(true);
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
          withCredentials: false,
        }
      );
      setLoader(true);
      if (data) {
        if (data.errors) {
          setLoader(false);
          console.log(data.errors);
          const { email, password, confirmPassword, tooShort } = data.errors;
          if (email) {
            setErrorMsg(MAILERR);
            generateError(email);
            setShowError(true);
            setLoader(false);
          } else if (password !== tooShort) {
            generateError(password);
            setErrorMsg(SHORTERR);
            setShowError(true);
            setLoader(false);
          } else if (confirmPassword !== values.confirmPassword) {
            generateError(confirmPassword);
            setErrorMsg(CONFIRMERR);
            setShowError(true);
            setLoader(false);
          }
        }
      }
    } catch (err) {
      if (err) {
        setLoader(false);
        console.log(err);
      }
    }
    setTimeout(stopLoader, 8000);
    setErrorMsg("");
  };

  return (
    <>
      {loader ? (
        <>
          <AdminComplete />
          <StyledLoader />
        </>
      ) : (
        <>
          {isAdmin ? (
            <StyledFlexDiv padding="7rem 0.5rem 1rem">
              <StyledMediumHeading padding="1rem" margin="20px 0px">
                Register new user
              </StyledMediumHeading>
              <StyledGreenForm
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  autoComplete="off"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setValues({ ...values, [e.target.name]: e.target.value });
                  }}
                />
                <label>Password</label>
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
                {showError && (
                  <StyledSmallHeading>{errorMsg}</StyledSmallHeading>
                )}
              </StyledGreenForm>
            </StyledFlexDiv>
          ) : (
            <AdminPermission></AdminPermission>
          )}
        </>
      )}
    </>
  );
}
