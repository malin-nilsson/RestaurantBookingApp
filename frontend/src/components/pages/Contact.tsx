import { StyledMediumHeading } from '../styled-components/Headings/StyledHeadings'
import { StyledAdressSpan } from '../styled-components/Text/StyledSpan'
import { StyledContactWrapper } from '../styled-components/Wrappers/ContactWrapper'
import { StyledFlexDiv } from '../styled-components/Wrappers/StyledFlex'
import { StyledNumberSpan } from '../styled-components/Text/StyledAdress'
import { StyledEmail } from '../styled-components/Text/StyledEmail'
import Facebook from '../../icons/facebook.svg'
import Instagram from '../../icons/instagram.svg'
import Twitter from '../../icons/twitter.svg'
import { StyledIconWrapper } from '../styled-components/Wrappers/StyledIconWrapper'

export default function Contact() {
  return (
    <div>
      <StyledFlexDiv>
        <StyledMediumHeading>Contact</StyledMediumHeading>
        <StyledContactWrapper>
          <StyledAdressSpan>Riddargatan 9</StyledAdressSpan>
          <StyledAdressSpan>114 35</StyledAdressSpan>
          <StyledAdressSpan>Stockholm</StyledAdressSpan>
          <StyledNumberSpan>+46 8 123 456</StyledNumberSpan>
          <StyledEmail>contact@lamere.com</StyledEmail>
          <StyledIconWrapper>
            <img src={Instagram} className="socialmedia" alt="" />
            <img src={Facebook} className="socialmedia" alt="" />
            <img src={Twitter} className="socialmedia" alt="" />
          </StyledIconWrapper>
        </StyledContactWrapper>
      </StyledFlexDiv>
    </div>
  )
}
