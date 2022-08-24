import styled from 'styled-components'
import { devices } from '../breakpoints/Breakpoints'

export const StyledHeroImage = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  .hero-image-container {
    position: absolute;
    top: 0;
    right: 0;
    padding-top: 90px;

    @media ${devices.desktop} {
      padding-top: 80px;
    }

    img {
      width: 100%;
      height: auto;
    }
  }
`
