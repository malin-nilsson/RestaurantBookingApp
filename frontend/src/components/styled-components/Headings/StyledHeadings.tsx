import styled from 'styled-components'

interface IHeadingProps {
  padding?: string
  fontSize?: string
  fontWeight?: string
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
  font-size: ${(props: IHeadingProps) => props.fontSize || '2.4rem'};
  font-weight: ${(props: IHeadingProps) => props.fontWeight || '100'};
  font-family: var(--headingfont);
  padding: ${(props: IHeadingProps) => props.padding || ''};
  margin: 0px;
`
export const StyledLogo = styled.div`
  position: fixed;
  padding: 15px 20px;
  z-index: 100;
  font-size: 1.8rem;
  font-weight: 900;
  font-family: var(--headingfont);
  text-transform: uppercase;
  cursor: pointer;

  img {
    height: 35px;
    width: 35px;
  }
`
