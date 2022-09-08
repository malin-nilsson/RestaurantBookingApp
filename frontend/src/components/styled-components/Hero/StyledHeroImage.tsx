import styled from 'styled-components'
import { devices } from '../../styling-breakpoints/breakpoints/Breakpoints'

export const StyledHeroImage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media ${devices.desktop} {
    height: 100vh;
  }

  .hero-image-container {
    position: relative;
    top: 0;
    right: 0;

    @media ${devices.desktop} {
      padding: 0;
    }

    img {
      width: 100%;
      height: auto;
    }
  }
`
