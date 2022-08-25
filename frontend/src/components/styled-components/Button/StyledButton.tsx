import styled from 'styled-components'

interface IButtonProps {
  margin?: string
  padding?: string
  fontSize?: string
  backgroundColor?: string
  color?: string
  border?: string
}

export const StyledButton = styled.button`
  margin: ${(props: IButtonProps) => props.margin || '10px 0px'};
  background-color: ${(props: IButtonProps) =>
    props.backgroundColor || 'var(--beige)'};
  color: ${(props: IButtonProps) => props.color || 'var(--green)'};
  border: ${(props: IButtonProps) => props.border || 'none'};
  padding: ${(props: IButtonProps) => props.padding || '16px'};
  font-weight: 500;
  text-transform: uppercase;
  font-family: var(--headingfont);
  font-size: ${(props: IButtonProps) => props.fontSize || '1.5rem'};
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #f6dea6;
  }

  a {
    color: var(--green);
    text-decoration: none;
  }
`

export const StyledButtonGreen = styled(StyledButton)`
  background-color: var(--green);
  border: 1px solid var(--green);
  transition: background-color 0.3s ease-in-out;
  color: var(--beige);

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
