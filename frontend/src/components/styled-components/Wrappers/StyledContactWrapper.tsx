import styled from 'styled-components'
import { devices } from '../breakpoints/Breakpoints'

export const StyledContactWrapper = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  padding: 200px 10px 50px;
  display: flex;
  flex-direction: column;
  font-size: 1.4rem;
  letter-spacing: 0.1rem;
  font-family: var(--headingfont);
  font-weight: 100;

  @media ${devices.tablet} {
    font-size: 1.6rem;
    padding: 420px 0px 100px;
    width: 50%;
  }

  @media ${devices.desktop} {
    padding: 670px 0px 100px;
    width: 30%;
  }

  .contact-box {
    margin: 35px 0px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0px 10px;

    @media ${devices.tablet} {
      padding: 0px;
    }

    div {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
  }
`
