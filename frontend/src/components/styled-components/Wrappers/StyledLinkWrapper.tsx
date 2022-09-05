import styled from 'styled-components'
import { devices } from '../../styling-breakpoints/breakpoints/Breakpoints'

// Admin link styling - "Find reservation" and "Add new reservation"

interface ILinkWrapperProps {
  margin?: string
}
export const StyledLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: ${(props: ILinkWrapperProps) => props.margin || ''};

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
