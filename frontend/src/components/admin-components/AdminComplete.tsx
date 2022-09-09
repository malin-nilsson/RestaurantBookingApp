import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  StyledMediumHeading,
  StyledSmallHeading,
} from "../styled-components/Headings/StyledHeadings";
import { StyledLinkWrapper } from "../styled-components/Wrappers/StyledLinkWrapper";

export default function AdminComplete() {
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  return (
    <>
      <StyledCompleteDiv>
        <StyledMediumHeading>Registration Complete!</StyledMediumHeading>
        <StyledSmallHeading>
          Wait 15 seconds to register a new user.
        </StyledSmallHeading>
        <StyledLinkWrapper>
          <li className="hover-effect">
            <NavLink
              to="/admin/start"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Back to Start
            </NavLink>
          </li>
          {/* <li className="hover-effect">
            <NavLink
              to="/admin/register"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Register New User
            </NavLink>
          </li> */}
        </StyledLinkWrapper>
      </StyledCompleteDiv>
    </>
  );
}

export const StyledCompleteDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 7rem;
  gap: 3rem;

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
