import styled from 'styled-components'

interface IHeadingProps {
  padding?: string
  fontSize?: string
  fontWeight?: string
  display?: string
  direction?: string
  gap?: string
}

export const StyledMediumHeading = styled.h2`
  text-align: center;
  font-size: ${(props: IHeadingProps) => props.fontSize || '3rem'};
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
  display: ${(props: IHeadingProps) => props.display || ''};
  flex-direction: ${(props: IHeadingProps) => props.direction || ''};
  gap: ${(props: IHeadingProps) => props.gap || ''};
  margin: 0px;

  span {
    background-color: var(--beige);
    color: var(--green);
    padding: 5px 9px;
    font-size: 1.5rem;
    letter-spacing: 0.15rem;
  }
`
