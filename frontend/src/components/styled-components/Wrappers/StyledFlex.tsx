import styled from 'styled-components'
import { devices } from '../../styling-breakpoints/breakpoints/Breakpoints'

interface IWrapperProps {
  justify?: string
  direction?: string
  align?: string
  gap?: string
  padding?: string
  width?: string
  margin?: string
  bgColor?: string
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

  section {
    margin-top: 50px;

    @media ${devices.tablet} {
      margin-top: 40px;
    }

    @media ${devices.desktop} {
      margin-top: 80px;
    }
  }

  .create-booking-wrapper {
    margin-top: 100px;
  }

  .search-forms {
    display: flex;
    flex-direction: column;

    @media ${devices.desktop} {
      flex-direction: row;
    }
  }
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
    width: ${(props: IWrapperProps) => props.width || ''};
    margin: ${(props: IWrapperProps) => props.margin || ''};
  }

  .arrow,
  a {
    cursor: pointer;
    color: var(--beige);
  }
`
