import styled from 'styled-components'
import { IStylingProps } from '../models/IStylingProps'

// Hero background used for booking form
export const StyledHeroForm = styled.div`
  background-size: cover;
  height: 100vh;
  overflow: ${(props: IStylingProps) => props.overflow || ''};
  background: ${(props: IStylingProps) => props.background || ''};
`
