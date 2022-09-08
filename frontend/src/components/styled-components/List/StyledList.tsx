import styled from 'styled-components'
import { devices } from '../../styling-breakpoints/breakpoints/Breakpoints'

export const StyledList = styled.ul`
  width: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 40px;
  margin: 0px auto 30px;
  padding: 0;

  @media ${devices.tablet} {
    min-width: 450px;
    max-width: 600px;
    margin: 30px auto;
  }

  @media ${devices.desktop} {
    min-width: 500px;
    max-width: 550px;
  }
  li {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    list-style: none;
    font-size: 1.4rem;
    font-weight: 100;
    width: 100%;
    padding: 30px;
    transition: scale 0.25s ease-in-out;
    background-color: var(--beige);
    color: var(--green);

    &:hover {
      cursor: default;
      scale: 1.01;
    }

    ////////////////////////////////////////
    // CSS classes used inside StyledList //
    ///////////////////////////////////////
    .booking {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 15px;
      justify-content: space-between;
      align-items: flex-start;

      @media ${devices.tablet} {
      }
    }

    .booking-heading {
      margin: 7px 0px;
      font-size: 1.8rem;
      font-weight: 300;
      text-transform: uppercase;
      font-family: var(--headingfont);
    }

    .button-wrapper {
      display: flex;
      flex-direction: row;
      gap: 20px;
      align-items: flex-start;

      // ICONS
      .material-symbols-outlined {
        cursor: pointer;
        font-size: 2rem;
      }
    }

    .title-bold {
      text-transform: uppercase;
      font-weight: 600;
      font-size: 1.4rem;
    }
  }
`
