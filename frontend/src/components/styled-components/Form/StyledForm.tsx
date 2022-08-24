import styled from 'styled-components'
import { devices } from '../breakpoints/Breakpoints'

interface IFormProps {
  border?: string
  padding?: string
  margin?: string
}

export const StyledForm = styled.form`
  min-width: 320px;
  margin: ${(props: IFormProps) => props.margin || '0 auto'};
  display: flex;
  border: ${(props: IFormProps) => props.border || '1px solid var(--beige)'};
  padding: 10px;
  flex-direction: column;
  font-family: var(--headingfont);
  gap: 10px;

  @media ${devices.tablet} {
    min-width: 500px;
    max-width: 550px;
    padding: 20px 40px;
  }

  .form-field {
    display: flex;
    flex-direction: column;
  }
  label {
    font-size: 1.4rem;
    font-weight: 500;
    margin: 8px 0px;
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

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    background: transparent;
    background-image: url("data:image/svg+xml;utf8,<svg fill='white' height='30' viewBox='0 0 24 24' width='30' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
    background-repeat: no-repeat;
    background-position-x: 100%;
    background-position-y: 2px;
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
  }
`
