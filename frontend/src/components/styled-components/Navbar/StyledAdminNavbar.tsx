import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { StyledMediumHeading } from '../Headings/StyledHeadings'
import { StyledPlantIcon } from '../Icon/StyledPlantIcon'

export default function AdminHeader() {
  return (
    <StyledAdminNavbar>
      <StyledPlantIcon position="relative">
        <Link to="/">
          <img src="/assets/logo.png" alt="La Mére logo"></img>
        </Link>
      </StyledPlantIcon>
      <StyledMediumHeading>Admin</StyledMediumHeading>
      <div>
        <span className="material-symbols-outlined">logout</span>
      </div>
    </StyledAdminNavbar>
  )
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
`
