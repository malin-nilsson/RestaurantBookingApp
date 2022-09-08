// STYLED COMPONENTS //
import { StyledMediumHeading } from '../styled-components/Headings/StyledHeadings'
import { StyledContactWrapper } from '../styled-components/Wrappers/StyledContactWrapper'
import { StyledFlexDiv } from '../styled-components/Wrappers/StyledFlex'
import { StyledIconWrapper } from '../styled-components/Wrappers/StyledIconWrapper'
import { StyledHeroImage } from '../styled-components/Hero/StyledHeroImage'

export default function Contact() {
  window.scrollTo(0, 0)

  return (
    <StyledFlexDiv>
      <StyledHeroImage>
        <div className="hero-image-container">
          <img
            src="assets/hero-image.jpg"
            alt="Table setting in a warmly lit restaurant"
          />
        </div>
      </StyledHeroImage>

      <StyledContactWrapper>
        <StyledFlexDiv>
          <StyledMediumHeading>Contact us</StyledMediumHeading>
        </StyledFlexDiv>
        <div className="contact-box">
          <div>
            <span>Riddargatan 9</span>
            <span>114 35, Stockholm</span>
            <span>Sweden</span>
          </div>
          <div>
            <span>+46 8 123 456</span>
            <span>info@lamere.com</span>
          </div>
        </div>
        <StyledFlexDiv>
          <StyledMediumHeading>Hours</StyledMediumHeading>
        </StyledFlexDiv>
        <div className="contact-box">
          <div>
            <span>Mon - Thurs</span>
            <span>Fri - Sat</span>
            <span>Sunday</span>
          </div>
          <div>
            <span>11:30 - 23:30</span>
            <span>11:30 - 01:00</span>
            <span>11:30 - 23:00</span>
          </div>
        </div>
        <StyledIconWrapper>
          <img
            src="assets/icons/instagram.svg"
            className="socialmedia"
            alt=""
          />
          <img src="assets/icons/facebook.svg" className="socialmedia" alt="" />
          <img src="assets/icons/twitter.svg" className="socialmedia" alt="" />
        </StyledIconWrapper>
      </StyledContactWrapper>
    </StyledFlexDiv>
  )
}
