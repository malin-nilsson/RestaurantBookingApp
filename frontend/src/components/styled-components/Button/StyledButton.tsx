import styled from 'styled-components'

export const StyledButton = styled.button`
  background-color: var(--beige);
  border: none;
  padding: 13px;
  font-weight: 600;
  text-transform: uppercase;
  font-family: var(--headingfont);
  font-size: 1.5rem;
  cursor: pointer;
  margin: 10px 0px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #f6dea6;
  }
`
