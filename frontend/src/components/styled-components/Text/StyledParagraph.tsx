import styled from 'styled-components'

interface ITextProps {
  fontSize?: string
  fontWeight?: string
  padding?: string
  color?: string
  textAlign?: string
}

export const StyledParagraph = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: ${(props: ITextProps) => props.padding || '15px'};
  margin: 0;
  font-size: ${(props: ITextProps) => props.fontSize || '1.6rem'};
  font-weight: ${(props: ITextProps) => props.fontWeight || '100'};
  line-height: 2.8rem;
  font-family: var(--headingfont);
  text-align: ${(props: ITextProps) => props.textAlign || 'center'};
  color: ${(props: ITextProps) => props.color || 'var(--beige)'};
`
