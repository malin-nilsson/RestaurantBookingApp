import styled from "styled-components";
import { devices } from "../breakpoints/Breakpoints";

interface ITextProps {
  fontSize?: string;
  padding?: string;
}

export const StyledParagraph = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: ${(props: ITextProps) => props.padding || "15px"};
  margin: 0;
  font-size: ${(props: ITextProps) => props.fontSize || "1.7rem"};
  font-weight: 100;
  font-family: var(--headingfont);
  text-align: center;
`;

export const StyledParagraphGreen = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: ${(props: ITextProps) => props.padding || "15px"};
  margin: 0;
  font-size: ${(props: ITextProps) => props.fontSize || "1.7rem"};
  /* font-weight: 100; */
  font-family: var(--headingfont);
  text-align: center;
  max-width: 80%;
  color: var(--green);
  @media ${devices.tablet} {
    max-width: 40%;
  }
`;
