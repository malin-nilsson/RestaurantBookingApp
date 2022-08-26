import styled from 'styled-components'
import { devices } from '../breakpoints/Breakpoints'

export const StyledList = styled.ul`
  min-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 40px;
  max-width: 300px;
  margin: 0px 0px 30px;
  padding: 0;

  @media ${devices.tablet} {
    min-width: 450px;
    max-width: 600px;
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
    border: 2px solid var(--beige);
    width: 100%;
    padding: 15px;
    transition: scale 0.25s ease-in-out;
    &:nth-child(odd) {
      background-color: var(--beige);
      color: var(--green);
    }

    &:hover {
      cursor: default;
      scale: 1.01;
    }

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

    .title-bold {
      font-weight: 600;
      text-transform: uppercase;
      font-size: 1.3rem;
    }

    .icons {
      width: 100%;
      gap: 15px;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;

      .material-symbols-outlined {
        cursor: pointer;
      }
    }
  }
`
