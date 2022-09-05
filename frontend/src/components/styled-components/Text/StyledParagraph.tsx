import styled from 'styled-components'

interface ITextProps {
  fontSize?: string
  fontWeight?: string
  padding?: string
  color?: string
  textAlign?: string
  textTransform?: string
}

export const StyledParagraph = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin: 0;
  padding: ${(props: ITextProps) => props.padding || '15px'};
  font-size: ${(props: ITextProps) => props.fontSize || '1.6rem'};
  font-weight: ${(props: ITextProps) => props.fontWeight || '100'};
  line-height: 2.8rem;
  text-transform: ${(props: ITextProps) => props.textTransform || ''};
  font-family: var(--headingfont);
  text-align: ${(props: ITextProps) => props.textAlign || 'center'};
  color: ${(props: ITextProps) => props.color || 'var(--beige)'};

  .title-bold {
    font-size: 1.5rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .material-symbols-outlined {
    font-size: 2.5rem;
  }
`
