import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { StyledAdminHeading } from "../Headings/StyledHeadings";
import { StyledPlantIcon } from "../Icon/StyledPlantIcon";
import { StyledFlexDiv } from "../Wrappers/StyledFlex";
import { StyledLinkWrapper } from "../Wrappers/StyledLinkWrapper";

export default function AdminHeader() {
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const [isAdmin, setIsAdmin] = useState(false);

  const [titles, setTitles] = useState({
    home: "Back Home",
    manage: "Manage Users",
  });

  const [isActive, setIsActive] = useState<Boolean>(false);

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/admin");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000/admin",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/admin");
        } else {
          if (data.role === "user") {
            setIsAdmin(false);
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

  const logOut = () => {
    removeCookie("jwt", { path: "/" });
    navigate("/admin");
  };

  return (
    <StyledAdminNavbar>
      <StyledPlantIcon position="relative">
        <Link to="/">
          <img src="/assets/logo.png" alt="La Mère logo"></img>
        </Link>
      </StyledPlantIcon>
      <StyledAdminHeading>ADMIN</StyledAdminHeading>
      <StyledFlexDiv direction="row" justify="flex-end">
        {isAdmin ? (
          <>
            <StyledLinkWrapper>
              <li className="hover-effect">
                <NavLink
                  to="/admin/manage"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Manage Users
                </NavLink>
              </li>
            </StyledLinkWrapper>
            <StyledLinkWrapper>
              <li className="hover-effect">
                <NavLink
                  to="/admin/register"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Register User
                </NavLink>
              </li>
            </StyledLinkWrapper>
          </>
        ) : null}
        <span onClick={logOut} className="material-symbols-outlined">
          logout
        </span>
      </StyledFlexDiv>
    </StyledAdminNavbar>
  );
}

export const StyledAdminNavbar = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px 0px;

  .material-symbols-outlined {
    font-size: 3.5rem;
    margin: 15px 20px;

    &:hover {
      cursor: pointer;
    }
  }

  .active-link {
    border-bottom: 1px solid var(--beige);
  }

  .hover-effect {
    padding: 0px 0px 0.5px;
    display: inline-block;
    position: relative;
    color: var(--beige);
    font-weight: 600;
    font-size: 1.1rem;
    text-transform: uppercase;
    text-decoration: none;

    &:after {
      content: "";
      position: absolute;
      width: 100%;
      transform: scaleX(0);
      height: 1px;
      bottom: 0;
      left: 0;
      background-color: var(--beige);
      transform-origin: bottom right;
      transition: transform 0.3s ease-out;
    }

    &:hover:after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
  }
`;
