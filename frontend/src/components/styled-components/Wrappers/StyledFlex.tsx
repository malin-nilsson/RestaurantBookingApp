import styled from 'styled-components'

interface IWrapperProps {
  justify?: string
  direction?: string
  align?: string
  gap?: string
  padding?: string
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
