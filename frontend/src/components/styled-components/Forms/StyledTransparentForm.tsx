import styled from 'styled-components'
import { devices } from '../../styling-breakpoints/breakpoints/Breakpoints'
import { IStylingProps } from '../models/IStylingProps'

export const StyledTransparentForm = styled.form`
  width: 95%;
  margin: ${(props: IStylingProps) => props.margin || '10px auto'};
  display: flex;
  padding: 15px;
  flex-direction: column;
  font-family: var(--headingfont);
  gap: 10px;

  @media ${devices.tablet} {
    min-width: 500px;
    max-width: 550px;
    padding: 20px 40px;
    border: ${(props: IStylingProps) =>
      props.border || '1px solid var(--beige)'};
  }

  @media ${devices.desktop} {
    padding: ${(props: IStylingProps) => props.padding || '25px'};
  }

  .form-field {
    display: flex;
    flex-direction: column;
    gap: 8px;

    input[type='date']::-webkit-calendar-picker-indicator {
      filter: invert(1);
    }
  }

  label {
    font-size: 1.4rem;
    font-weight: 500;
    margin: 10px 0px;
    text-transform: uppercase;
  }

  input,
  select {
    background-color: transparent;
    color: #fff;
    border: 1px solid var(--beige);
    padding: 10px 8px;
    font-size: 1.5rem;

    &:focus {
      outline: none;
      border: 1px solid #fff6ea;
    }
  }

  input.search-input {
    width: 100%;
  }

  .guest-amount-wrapper {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: flex-start;

    button {
      border: none;
      background-color: var(--beige);
      color: var(--green);
      padding: 10px;
      transition: scale 0.2s ease-in-out;

      &:hover {
        cursor: pointer;
        scale: 1.07;
      }
    }

    .guest-amount-btns {
      display: flex;
      gap: 15px;
    }
  }

  /* Remove input:number appearance */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    border: none;
    font-size: 2rem;
    -moz-appearance: textfield;
    padding: 10px;
    width: 10%;
    text-align: center;
  }

  option {
    color: var(--green);
  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    background: transparent;
    background-image: url("data:image/svg+xml;utf8,<svg fill='white' height='30' viewBox='0 0 24 24' width='30' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
    background-repeat: no-repeat;
    background-position-x: 100%;
    background-position-y: 2px;
  }

  input[type='checkbox'] {
    margin-right: 10px;
    width: 18px;
    height: 18px;
  }

  .optional {
    margin: 0px 8px;
    font-weight: 100;
    font-size: 1rem;
  }

  .error-generic {
    font-size: 1.3rem;
    font-weight: 500;
    border: 2px solid #a90000;
    margin: 5px 0px;
    padding: 8px;
    background-color: var(--beige);
    color: #2d0606;
  }

  .error-input {
    border: 1px solid #a90000;
  }

  .material-symbols-outlined.arrow {
    cursor: pointer;
    font-size: 2.5rem;
  }

  .gdpr {
    flex-direction: row;
    align-items: center;

    a {
      color: var(--beige);
    }
  }

  .search-box {
    display: flex;
    gap: 2px;
    width: 100%;
    height: auto;
    justify-content: center;
    align-items: stretch;
  }

  .increase,
  .decrese {
    transition: scale 0.2s ease-in-out;

    &:hover {
      scale: 1.02;
    }
  }
`
