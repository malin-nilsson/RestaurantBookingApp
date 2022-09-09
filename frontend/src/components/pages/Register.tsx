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
import { getAdmins } from "../../services/adminService";
import { IAdmin } from "../../models/IAdmin";
import AdminPermission from "../admin-components/AdminPermission";
import AdminComplete from "../admin-components/AdminComplete";
import { StyledLoader } from "../styled-components/Loader/StyledLoader";

export default function Register() {
  const navigate = useNavigate();

  const MAILERR = "Email already in use!";
  const PASSERR = "Password need to be at least 4 characters.";
  const CONFIRMPASS = "Password's don't match!";

  const [loading, setLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [isComplete, setIsComplete] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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
    console.log(error);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.password !== values.confirmPassword) {
      setShowError(true);
      setErrorMsg(CONFIRMPASS);
      setIsComplete(false);
      setLoading(false);
    }
    if (values.password.length < 4) {
      setShowError(true);
      setErrorMsg(PASSERR);
      setIsComplete(false);
      setLoading(false);
    } else {
      try {
        setIsComplete(false);
        setTimeout(() => {
          setIsComplete(true);
          setLoading(false);
        }, 1500);
        const { data } = await axios.post(
          "http://localhost:4000/admin/register",
          {
            ...values,
          },
          {
            withCredentials: false,
          }
        );

        if (data) {
          if (data.errors) {
            const { email, password, confirmPassword } = data.errors;
            if (email) {
              setErrorMsg(MAILERR);
              generateError(email);
              setShowError(true);
              setIsComplete(false);
              setLoading(false);
            } else if (password) {
              setErrorMsg(PASSERR);
              generateError(password);
              setShowError(true);
              setIsComplete(false);
              setLoading(false);
            } else if (confirmPassword) {
              setErrorMsg(CONFIRMPASS);
              generateError(confirmPassword);
              setShowError(true);
              setIsComplete(false);
              setLoading(false);
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      {isComplete ? (
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
      ) : (
        <>
          <AdminComplete />
          <StyledLoader />
        </>
      )}
    </>
  );
}
