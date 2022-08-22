import styled from 'styled-components'
import { devices } from '../breakpoints/Breakpoints'

export default function Hero() {
  return (
    <StyledHero>
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
        </div>
      </div>
    </StyledHero>
  )
}

const StyledHero = styled.section`
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
    width: 100%;
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
    position: absolute;
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

    @media ${devices.desktop} {
      gap: 15px;
      padding: 140px 0px 0px;
      width: unset;
    }
  }
`
