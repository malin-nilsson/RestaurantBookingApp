import styled from "styled-components";
import { devices } from "../../styling-breakpoints/breakpoints/Breakpoints";

interface IHeadingProps {
  padding?: string;
  fontSize?: string;
  fontWeight?: string;
  display?: string;
  direction?: string;
  gap?: string;
  margin?: string;
  textAlign?: string;
}

export const StyledMediumHeading = styled.h2`
  text-align: ${(props: IHeadingProps) => props.textAlign || "center"};
  font-size: ${(props: IHeadingProps) => props.fontSize || "2.8rem"};
  font-weight: 100;
  font-family: var(--headingfont);
  padding: ${(props: IHeadingProps) => props.padding || ""};
  margin: ${(props: IHeadingProps) => props.margin || "5px"};
  display: flex;
  justify-content: space-between;
`;

export const StyledSmallHeading = styled.h3`
  text-align: center;
  font-size: ${(props: IHeadingProps) => props.fontSize || "2.3rem"};
  font-weight: ${(props: IHeadingProps) => props.fontWeight || "100"};
  font-family: var(--headingfont);
  padding: ${(props: IHeadingProps) => props.padding || ""};
  display: ${(props: IHeadingProps) => props.display || ""};
  flex-direction: ${(props: IHeadingProps) => props.direction || ""};
  gap: ${(props: IHeadingProps) => props.gap || ""};
  margin: 0px;
`;

export const StyledAdminHeading = styled.h4`
  text-align: center;
  font-size: ${(props: IHeadingProps) => props.fontSize || "1.6rem"};
  font-weight: ${(props: IHeadingProps) => props.fontWeight || "100"};
  font-family: var(--headingfont);
  padding: ${(props: IHeadingProps) => props.padding || ""};
  display: ${(props: IHeadingProps) => props.display || ""};
  flex-direction: ${(props: IHeadingProps) => props.direction || ""};
  gap: ${(props: IHeadingProps) => props.gap || ""};
  text-indent: 1.2rem;
  margin: 0px;

  @media ${devices.phone} {
    font-size: 2.8rem;
  }
`;
