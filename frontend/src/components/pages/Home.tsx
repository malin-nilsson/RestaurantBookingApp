// STYLED COMPONENTS //
import styled from 'styled-components'
import StyledHeroVideo from '../styled-components/Hero/StyledHeroVideo'
import { StyledParagraph } from '../styled-components/Text/StyledParagraph'
import { devices } from '../styling-breakpoints/breakpoints/Breakpoints'
import {
  StyledButton,
  StyledGreenButton,
} from '../styled-components/Buttons/StyledButtons'
import { StyledMediumHeading } from '../styled-components/Headings/StyledHeadings'
// REACT ROUTER
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <div>
        <StyledHeroVideo />
      </div>

      <HomeContentWrapper>
        <div className="textWrapper">
          <StyledMediumHeading
            padding="0px 0px 10px"
            fontSize="3.6rem"
            textAlign="left"
          >
            Modern French cuisine in the heart of Stockholm
          </StyledMediumHeading>
          <StyledParagraph textAlign="left" padding="10px 0px">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
            aspernatur nisi sunt eius dolorem libero fugiat, repellat officia
            eos doloribus ducimus at laudantium soluta illo impedit architecto
            consequuntur ipsum.
          </StyledParagraph>
          <StyledParagraph textAlign="left" padding="10px 0px">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum quo
            aspernatur aliquid ullam eaque ratione. Saepe aspernatur nisi sunt
            eius dolorem libero.
          </StyledParagraph>
        </div>
        <div className="imageWrapper">
          <video poster="" autoPlay loop muted>
            <source src="assets/restaurant-interior.mp4" />
          </video>
        </div>
      </HomeContentWrapper>
      <FooterWrapper>
        <Link to="/reservations">Make a reservation</Link>
      </FooterWrapper>
    </>
  )
}

const HomeContentWrapper = styled.div`
  padding: 40px 0px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 25px;

  @media ${devices.tablet} {
    width: 100%;
    padding: 60px 0px 0px;
  }

  @media ${devices.desktop} {
    padding: 120px 30px;
    flex-direction: row;
  }

  .imageWrapper {
    width: 100%;
    margin: 0 auto;

    @media ${devices.desktop} {
      width: 55%;
    }

    video {
      width: 100%;
    }
  }

  .textWrapper {
    display: flex;
    flex-direction: column;
    padding: 0px 20px;
    margin: 0 auto;
    width: 100%;

    @media ${devices.tablet} {
      padding: 0px 50px;
    }

    @media ${devices.desktop} {
      padding: 0px 40px 0px 30px;
      width: 45%;
    }
  }
`

const FooterWrapper = styled.div`
  padding: 40px 0px 40px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--beige);

  a {
    text-transform: uppercase;
    text-align: center;
    font-family: var(--headingfont);
    border: 1px solid var(--green);
    padding: 20px 30px;
    color: var(--green);
    text-decoration: none;
    font-size: 1.8rem;
    transition: background-color 0.3s ease-in-out;

    &:hover {
      color: var(--beige);
      background-color: var(--green);
    }
  }

  @media ${devices.tablet} {
    padding: 80px 0px 80px 0px;
  }
`
