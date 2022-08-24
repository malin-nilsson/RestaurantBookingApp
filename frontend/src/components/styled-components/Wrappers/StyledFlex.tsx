import styled from 'styled-components'
import { devices } from '../breakpoints/Breakpoints'

interface IWrapperProps {
  justify?: string
  direction?: string
  align?: string
  gap?: string
  padding?: string
  width?: string
}

export const StyledFlexDiv = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${(props: IWrapperProps) => props.direction || 'column'};
  justify-content: ${(props: IWrapperProps) => props.justify || 'center'};
  align-items: ${(props: IWrapperProps) => props.align || 'center'};
  gap: ${(props: IWrapperProps) => props.gap || '10px'};
  padding: ${(props: IWrapperProps) => props.padding || ''};
`
export const StyledHeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin: 0 auto;
  width: ${(props: IWrapperProps) => props.width || '100%'};

  @media ${devices.tablet} {
    width: 80%;
  }

  @media ${devices.desktop} {
    width: 100%;
  }

  .arrow,
  a {
    cursor: pointer;
    color: var(--beige);
  }
`

export const StyledHeadingWrapperLarge = styled(StyledHeadingWrapper)`
  @media ${devices.desktop} {
    width: 45%;
  }
`
