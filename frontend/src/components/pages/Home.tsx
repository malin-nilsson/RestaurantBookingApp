import StyledHero from "../styled-components/Hero/StyledHero";
import WineAndFood from "../../images/la_mere_wine_food.jpg";
import { StyledMediumHeading } from "../styled-components/Headings/Headings";
import styled from "styled-components";
import {
  StyledParagraph,
  StyledParagraphGreen,
} from "../styled-components/Text/StyledParagraph";
import { devices } from "../styled-components/breakpoints/Breakpoints";
import {
  StyledButton,
  StyledButtonGreen,
} from "../styled-components/Button/StyledButton";
import { Link, NavLink } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div>
        <StyledHero />
      </div>

      <ContentWrapper>
        <div className="textWrapper">
          <h1>A restaurant for all...</h1>
          <StyledParagraph>
            ..men om vi ska vara ärliga, framförallt för köttälskare. Om vi får
            skryta, så har AG Sveriges bästa porterhouse, clubsteak, entrecôte
            etc, handplockade och levererade av Scan. Självklart finns det
            mycket annat på menyn, men det är detta som ligger oss närmast om
            hjärtat. Vi hängmörar själva och i den stora kylen vid entrén hänger
            styckena på rad.
          </StyledParagraph>
          <StyledParagraph>
            Utbudet varierar eftersom vi helst använder närproducerade och
            säsongsbetonade råvaror, till exempel vilt på vintern och lamm på
            våren.
          </StyledParagraph>
          <StyledParagraph>
            Lokalen var en gång Hallbergs silversmedsverkstad och eftersom AG är
            den kemiska beteckningen för silver, fick det bli namnet. Jonas
            Bohlin har skapat inredningen med mycket kakel, småländska
            armaturer, läder från Tärnsjö och specialritade stolar.
          </StyledParagraph>
        </div>
        <div className="imageWrapper">
          <img src={WineAndFood} alt="food_and_wine" className="wineAndFood" />
        </div>
      </ContentWrapper>
      <MainPageWrapper>
        <h1>Book a table</h1>
        <StyledParagraphGreen>
          We are usually fully booked weeks ahead, you should probably make a
          reservation now.
        </StyledParagraphGreen>
        <StyledButtonGreen>
          <Link to="/reservations">To reservations</Link>
          {/* <a href="http://localhost:3000/reservations">To reservations</a> */}
        </StyledButtonGreen>
      </MainPageWrapper>
    </>
  );
}

const ContentWrapper = styled.div`
  margin: 40px 0px 40px 0px;
  padding: 40px 0px 40px 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* width: 100vw; */
  gap: 25px;
  @media ${devices.tablet} {
    margin: 80px 0px 80px 0px;
    padding: 80px 0px 80px 0px;
  }

  .imageWrapper,
  .textWrapper {
    /* flex-direction: column; */
    width: 80%;
    @media ${devices.tablet} {
      width: 45%;
    }
  }

  .textWrapper {
    display: flex;
    flex-direction: column;
  }

  h1 {
    text-align: center;
    font-size: 5rem;
    font-weight: 100;
    /* text-transform: uppercase; */
    font-family: var(--headingfont);
  }
  .wineAndFood {
    width: 100%;
  }
`;

const MainPageWrapper = styled.div`
  /* margin: 40px 0px 40px 0px; */
  /* width: 100vw; */
  padding: 40px 0px 40px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--beige);
  @media ${devices.tablet} {
    /* margin: 80px 0px 80px 0px; */
    padding: 80px 0px 80px 0px;
  }

  h1 {
    /* width: 100vw; */
    font-family: var(--headingfont);
    text-align: center;
    color: var(--green);
    font-size: 5rem;
    font-weight: 100;
  }
`;
