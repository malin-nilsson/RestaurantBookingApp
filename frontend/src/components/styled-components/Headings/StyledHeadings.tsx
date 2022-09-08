import styled from 'styled-components'
import { IStylingProps } from '../models/IStylingProps'

export const StyledMediumHeading = styled.h2`
  text-align: ${(props: IStylingProps) => props.textAlign || 'center'};
  font-size: ${(props: IStylingProps) => props.fontSize || '2.8rem'};
  font-weight: 100;
  font-family: var(--headingfont);
  padding: ${(props: IStylingProps) => props.padding || ''};
  margin: ${(props: IStylingProps) => props.margin || '0px'};
  display: flex;
  justify-content: space-between;
`
export const StyledSmallHeading = styled.h3`
  text-align: center;
  font-size: ${(props: IStylingProps) => props.fontSize || '2.3rem'};
  font-weight: ${(props: IStylingProps) => props.fontWeight || '100'};
  font-family: var(--headingfont);
  padding: ${(props: IStylingProps) => props.padding || ''};
  display: ${(props: IStylingProps) => props.display || ''};
  flex-direction: ${(props: IStylingProps) => props.direction || ''};
  gap: ${(props: IStylingProps) => props.gap || ''};
  margin: 0px;
`
