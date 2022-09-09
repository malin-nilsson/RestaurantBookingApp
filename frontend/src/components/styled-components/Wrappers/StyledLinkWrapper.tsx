import styled from 'styled-components'
import { devices } from '../../styling-breakpoints/breakpoints/Breakpoints'
import { IStylingProps } from '../models/IStylingProps'

// Admin link styling - "Find reservation" and "Add new reservation"
export const StyledLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: ${(props: IStylingProps) => props.margin || ''};

  @media ${devices.tablet} {
    flex-direction: row;
    gap: 35px;
  }

  a,
  span {
    color: var(--beige);
    font-weight: 100;
    font-size: 1.5rem;
    font-family: var(--headingfont);
    text-transform: uppercase;
    text-decoration: none;

    &:hover {
      cursor: pointer;
    }
  }
`
