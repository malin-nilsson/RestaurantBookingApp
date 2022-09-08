import styled from 'styled-components'
import { IStylingProps } from '../models/IStylingProps'

export const StyledParagraph = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin: 0;
  padding: ${(props: IStylingProps) => props.padding || '15px'};
  font-size: ${(props: IStylingProps) => props.fontSize || '1.8rem'};
  font-weight: ${(props: IStylingProps) => props.fontWeight || '100'};
  line-height: 2.9rem;
  text-transform: ${(props: IStylingProps) => props.textTransform || ''};
  font-family: var(--headingfont);
  text-align: ${(props: IStylingProps) => props.textAlign || 'center'};
  color: ${(props: IStylingProps) => props.color || 'var(--beige)'};

  .title-bold {
    font-size: 1.5rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  .material-symbols-outlined {
    font-size: 2.5rem;
  }
`
