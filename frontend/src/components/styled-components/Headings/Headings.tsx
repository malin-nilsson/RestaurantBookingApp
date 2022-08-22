import styled from 'styled-components'

interface IHeadingProps {
  padding?: string
}

export const StyledMediumHeading = styled.h2`
  text-align: center;
  font-size: 3rem;
  font-weight: 100;
  font-family: var(--headingfont);
  padding: ${(props: IHeadingProps) => props.padding || ''};
  margin: 5px;
`
export const StyledSmallHeading = styled.h3`
  text-align: center;
  font-size: 2.4rem;
  font-weight: 100;
  font-family: var(--headingfont);
  padding: 0px;
  margin: 0px;
`
