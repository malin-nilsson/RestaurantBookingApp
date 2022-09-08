import styled from 'styled-components'
import { devices } from '../../styling-breakpoints/breakpoints/Breakpoints'
import { IStylingProps } from '../models/IStylingProps'

export const StyledPlantIcon = styled.div`
  position: ${(props: IStylingProps) => props.position || 'absolute'};
  padding: 2rem;
  z-index: 100;
  font-weight: 900;
  font-family: var(--headingfont);
  text-transform: uppercase;
  cursor: pointer;

  @media ${devices.desktop} {
    padding: 1.2rem 2rem;
    position: ${(props: IStylingProps) => props.position || 'fixed'};
  }

  img {
    height: 2.7rem;
    width: 2.7rem;
    transition: scale 0.15s ease-in-out;

    &:hover {
      scale: 1.1;
    }
  }
`
