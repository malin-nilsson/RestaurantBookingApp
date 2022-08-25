import styled from 'styled-components'

export const StyledLinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 35px;

  a {
    color: var(--beige);
    font-weight: 100;
    font-size: 1.5rem;
    font-family: var(--headingfont);
    text-transform: uppercase;
    text-decoration: none;
    border-bottom: 1px solid var(--beige);
  }
`
