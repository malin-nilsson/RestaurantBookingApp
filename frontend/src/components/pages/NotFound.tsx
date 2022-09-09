// REACT ROUTER //
import { Link } from 'react-router-dom'
// STYLED COMPONENTS //
import { StyledButton } from '../styled-components/Buttons/StyledButtons'
import { StyledMediumHeading } from '../styled-components/Headings/StyledHeadings'
import { StyledFlexDiv } from '../styled-components/Wrappers/StyledFlex'

export default function NotFound() {
  return (
    <StyledFlexDiv padding="200px 100px">
      <StyledMediumHeading>
        Uh oh, we couldn't find that page.
      </StyledMediumHeading>
      <StyledButton>
        <Link to="/">Go back home</Link>
      </StyledButton>
    </StyledFlexDiv>
  )
}
