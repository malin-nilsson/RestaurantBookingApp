import styled from 'styled-components'
import { devices } from '../../styling-breakpoints/breakpoints/Breakpoints'

interface IPlantProps {
  position?: string
}

export const StyledPlantIcon = styled.div`
  position: ${(props: IPlantProps) => props.position || 'absolute'};
  margin: 15px 20px;
  z-index: 100;
  font-size: 1.8rem;
  font-weight: 900;
  font-family: var(--headingfont);
  text-transform: uppercase;
  cursor: pointer;

  @media ${devices.desktop} {
  }

  img {
    height: 35px;
    width: 35px;
    transition: scale 0.15s ease-in-out;

    &:hover {
      scale: 1.15;
    }
  }
`
