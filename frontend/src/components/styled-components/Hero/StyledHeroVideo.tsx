import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { devices } from '../../styling-breakpoints/breakpoints/Breakpoints'

export default function Hero() {
  return (
    <StyledHeroVideo>
      <div className="hero-container">
        <div className="video-container">
          <video poster="" autoPlay loop muted>
            <source src="assets/hero-video.mp4" className="video-bg" />
          </video>
        </div>
        <div className="hero-text">
          <div>
            <h1>La Mère</h1>
          </div>
          <div className="hero-links">
            <Link to="/reservations">Book A Table</Link>
            <Link to="/menu">Menu</Link>
          </div>
        </div>
      </div>
    </StyledHeroVideo>
  )
}

const StyledHeroVideo = styled.section`
  h1 {
    font-size: 5rem;
    font-weight: 100;
    text-transform: uppercase;
    font-family: var(--headingfont);

    @media ${devices.tablet} {
      font-size: 7rem;
    }
  }

  .hero-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;

    @media ${devices.tablet} {
      height: 55vh;
    }

    @media ${devices.desktop} {
      height: 100vh;
    }
  }

  .video-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    top: 0;
    right: 0;
  }

  video {
    object-fit: cover;
    width: 100%;
    height: 70vh;
    object-position: bottom;

    @media ${devices.tablet} {
      object-position: top center;
    }
    @media ${devices.desktop} {
      height: 100vh;
    }
  }

  .hero-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    padding: 90px 0px 0px;

    @media ${devices.tablet} {
      padding: 150px 0px 0px;
    }

    @media ${devices.desktop} {
      padding: 200px 0px 0px;
      width: unset;
    }
  }

  .hero-links {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 30px 0px 0px;

    @media ${devices.tablet} {
      flex-direction: row;
      gap: 40px;
      margin: 30px 0px;
    }

    a {
      text-transform: uppercase;
      text-align: center;
      font-family: var(--headingfont);
      border: 1px solid var(--beige);
      padding: 10px 25px;
      color: var(--beige);
      text-decoration: none;
      font-size: 1.7rem;
      transition: background-color 0.3s ease-in-out;

      &:hover {
        color: var(--green);
        background-color: var(--beige);
      }
    }
  }
`
