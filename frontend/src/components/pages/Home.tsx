import StyledHeroVideo from '../styled-components/Hero/StyledHeroVideo'
import styled from 'styled-components'
import { StyledParagraph } from '../styled-components/Text/StyledParagraph'
import { devices } from '../styling-breakpoints/breakpoints/Breakpoints'
import { StyledButtonGreen } from '../styled-components/Buttons/StyledButtons'
import { Link } from 'react-router-dom'
import { StyledMediumHeading } from '../styled-components/Headings/StyledHeadings'

export default function Home() {
  window.scrollTo(0, 0)

  return (
    <>
      <div>
        <StyledHeroVideo />
      </div>

      <HomeContentWrapper>
        <div className="textWrapper">
          <StyledMediumHeading
            padding="0px 0px 10px"
            fontSize="4.7rem"
            textAlign="left"
          >
            A restaurant for all...
          </StyledMediumHeading>
          <StyledParagraph textAlign="left" padding="10px 0px">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
            aspernatur nisi sunt eius dolorem libero fugiat, repellat officia
            eos doloribus ducimus at laudantium soluta illo impedit architecto
            consequuntur reprehenderit ipsum.
          </StyledParagraph>
          <StyledParagraph textAlign="left" padding="10px 0px">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum quo
            aspernatur aliquid ullam eaque ratione.
          </StyledParagraph>
          <StyledParagraph textAlign="left" padding="10px 0px">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis vitae
            harum amet sunt! Aliquam ex, nostrum ratione placeat similique
            earum? Laudantium maiores cum delectus quo ex distinctio.
          </StyledParagraph>
        </div>
        <div className="imageWrapper">
          <img
            src="assets/wine-food.jpg"
            alt="Glass of wine and a plate of food in restaurant setting"
            className="wineAndFood"
          />
        </div>
      </HomeContentWrapper>
      <FooterWrapper>
        <StyledParagraph color="var(--green)" padding="0px 7px">
          We are usually fully booked months in advance.
        </StyledParagraph>
        <StyledParagraph color="var(--green)" padding="0px 7px 20px">
          You should probably make a reservation now.
        </StyledParagraph>
        <Link to="/reservations">
          <StyledButtonGreen>To reservations</StyledButtonGreen>
        </Link>
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
    padding: 100px 30px 100px;
    flex-direction: row;
  }

  .imageWrapper,
  .textWrapper {
    width: 100%;

    @media ${devices.tablet} {
      text-align: center;
    }
  }

  .textWrapper {
    display: flex;
    flex-direction: column;
    padding: 0px 20px;

    @media ${devices.tablet} {
      padding: 0px 50px;
      margin: 0 auto;
    }

    @media ${devices.desktop} {
      padding: 0px 50px 0px 30px;
    }
  }

  .wineAndFood {
    width: 100%;
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
    color: var(--beige);
  }
  @media ${devices.tablet} {
    padding: 80px 0px 80px 0px;
  }
`
