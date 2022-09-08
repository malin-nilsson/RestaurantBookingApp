import styled from 'styled-components'
import { devices } from '../../styling-breakpoints/breakpoints/Breakpoints'
import { IStylingProps } from '../models/IStylingProps'

export const StyledFlexDiv = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${(props: IStylingProps) => props.direction || 'column'};
  justify-content: ${(props: IStylingProps) => props.justify || 'center'};
  align-items: ${(props: IStylingProps) => props.align || 'center'};
  gap: ${(props: IStylingProps) => props.gap || '10px'};
  padding: ${(props: IStylingProps) => props.padding || ''};

  section {
    margin-top: 50px;
    width: 100%;

    @media ${devices.tablet} {
      margin: 0px auto;
      width: 100%;
    }

    @media ${devices.desktop} {
      margin: ${(props: IStylingProps) => props.margin || '10px auto 0px'};
      width: 100%;
    }
  }

  .image-container {
    padding: 50px 0px;
    width: 90%;
    margin: 0 auto;

    @media ${devices.tablet} {
      padding: 120px 0px;
      width: 80%;
    }

    @media ${devices.desktop} {
      padding: 160px 0px;
      width: 60%;
    }

    img {
      width: 100%;
      height: auto;
    }
  }

  ///////////////////////////////////////
  // CSS classes used inside StyledFlex//
  ///////////////////////////////////////
  .guest-card {
    width: 95%;
    border: 1px solid var(--beige);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 25px;
    padding: 10px;

    @media ${devices.tablet} {
      margin: 30px 0px 0px;
      width: 60%;
      padding: 20px;
    }

    @media ${devices.desktop} {
      margin: 0px 0px 25px;
      width: 40%;
    }

    .guest-details {
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        margin: 0px 5px;
      }

      .guest-name {
        font-size: 1.8rem;
        text-transform: uppercase;
        font-family: var(--headingfont);
        font-weight: 100;
      }
    }

    .guest-detail-bold {
      font-weight: 900;
      text-transform: uppercase;
    }

    .material-symbols-outlined {
      font-size: 3.5rem;
      margin-right: 10px;
    }
    .material-symbols-outlined.arrow {
      font-size: 2.5rem;
    }
  }

  .create-booking-wrapper {
    @media ${devices.tablet} {
      margin-top: 50px;
    }

    @media ${devices.desktop} {
      margin-top: 100px;
    }
  }

  .search-forms {
    display: flex;
    flex-direction: column;
    width: 100%;

    @media ${devices.desktop} {
      width: 80%;
      margin: 0 auto;
      flex-direction: row;
      justify-content: center;
    }
  }

  span {
    font-size: 1.6rem;
  }

  .guest-info {
    font-family: var(--headingfont);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 25px;
    font-weight: 100;

    div {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .material-symbols-outlined {
      font-size: 2.5rem;
      margin-right: 5px;
    }
  }

  .material-symbols-outlined.arrowdown {
    font-size: 5.5rem;
  }
`

// Wrapper for heading used inside StyledForm
export const StyledHeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin: 0 auto;
  width: ${(props: IStylingProps) => props.width || '100%'};

  @media ${devices.tablet} {
    width: 80%;
  }

  @media ${devices.desktop} {
    width: ${(props: IStylingProps) => props.width || ''};
    margin: ${(props: IStylingProps) => props.margin || ''};
  }

  .arrow,
  a {
    cursor: pointer;
    color: var(--beige);
  }
`
