import styled from 'styled-components'
import { devices } from '../../styling-breakpoints/breakpoints/Breakpoints'
import { StyledTransparentForm } from './StyledTransparentForm'

export const StyledGreenForm = styled(StyledTransparentForm)`
  background-color: var(--green);
  color: var(--beige);
  overflow: scroll;
  margin: 0px 10px 50px;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  @media ${devices.tablet} {
    padding: 20px 50px;
    min-width: 550px;
    max-width: 650px;
  }

  .input-container {
    position: relative;

    input {
      width: 100%;
      padding: 10px 8px 10px 40px;
    }

    .material-symbols-outlined {
      font-size: 1.9rem;
      position: absolute;
      top: 0;
      left: 0;
      padding: 13px;
    }
  }
`
