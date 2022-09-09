import { Link, NavLink } from "react-router-dom";
import { StyledMediumHeading } from "../styled-components/Headings/StyledHeadings";
import { StyledFlexDiv } from "../styled-components/Wrappers/StyledFlex";
import { StyledLinkWrapper } from "../styled-components/Wrappers/StyledLinkWrapper";
import { StyledCompleteDiv } from "./AdminComplete";

export default function AdminPermission() {
  return (
    <>
      <StyledCompleteDiv>
        <StyledMediumHeading>Access denied!</StyledMediumHeading>
        <StyledLinkWrapper>
          <li className="hover-effect">
            <NavLink
              to="/admin/start"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Back to Start
            </NavLink>
          </li>
        </StyledLinkWrapper>
      </StyledCompleteDiv>
    </>
  );
}
