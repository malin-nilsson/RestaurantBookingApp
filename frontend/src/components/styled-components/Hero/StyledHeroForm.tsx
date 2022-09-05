import styled from 'styled-components'

// Hero background used in booking form
interface IHeroFormProps {
  overflow?: string
  background?: string
}

export const StyledHeroForm = styled.div`
  background-size: cover;
  height: 100vh;
  overflow: ${(props: IHeroFormProps) => props.overflow || ''};
  background: ${(props: IHeroFormProps) => props.background || ''};
`
