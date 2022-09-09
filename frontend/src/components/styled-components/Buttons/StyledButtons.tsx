import styled from 'styled-components'
import { IStylingProps } from '../models/IStylingProps'

export const StyledButton = styled.button`
  margin: ${(props: IStylingProps) => props.margin || '10px 0px'};
  background-color: ${(props: IStylingProps) =>
    props.bgColor || 'var(--beige)'};
  color: ${(props: IStylingProps) => props.color || 'var(--green)'};
  border: ${(props: IStylingProps) => props.border || 'none'};
  padding: ${(props: IStylingProps) => props.padding || '16px'};
  font-size: ${(props: IStylingProps) => props.fontSize || '1.5rem'};
  font-weight: 500;
  text-transform: uppercase;
  font-family: var(--headingfont);
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #f6dea6;
  }

  a {
    color: var(--green);
    text-decoration: none;
  }

  .material-symbols-outlined {
    font-size: 2.5rem;
  }
`

export const StyledAdminButton = styled(StyledButton)`
  padding: 20px 15px;
  font-size: 1.6rem;
`

export const StyledGreenButton = styled(StyledButton)`
  font-size: ${(props: IStylingProps) => props.fontSize || '1.5rem'};
  padding: ${(props: IStylingProps) => props.padding || ''};
  background-color: var(--green);
  border: 1px solid var(--green);
  transition: background-color 0.3s ease-in-out;
  color: var(--beige);
  display: flex;
  gap: 10px;

  &:hover {
    background-color: var(--beige);
    border: 1px solid var(--green);
    color: var(--green);
  }

  a {
    color: var(--beige);
    text-decoration: none;
  }
`
