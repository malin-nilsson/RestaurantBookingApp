import styled from 'styled-components'
import { devices } from '../../styling-breakpoints/breakpoints/Breakpoints'

export const StyledHeroImage = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  .hero-image-container {
    position: absolute;
    top: 0;
    right: 0;
    padding-top: 80px;

    @media ${devices.desktop} {
      padding: 0;
    }

    img {
      width: 100%;
      height: auto;
    }
  }
`
