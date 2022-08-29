import styled from 'styled-components'
import { devices } from '../../styling-breakpoints/breakpoints/Breakpoints'

interface IWrapperProps {
  width?: string
}

export const StyledConfirmationWrapper = styled.div`
  width: 95%;
  margin: 0 auto;
  background-color: var(--green);
  color: var(--beige);
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media ${devices.tablet} {
    width: 80%;
    padding: 30px;
  }

  @media ${devices.desktop} {
    width: ${(props: IWrapperProps) => props.width || ''};
    padding: 30px;
  }

  .booking-details {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  span {
    background-color: var(--beige);
    color: var(--green);
    padding: 8px 9px;
    font-size: 1.5rem;
    letter-spacing: 0.15rem;
  }
`
