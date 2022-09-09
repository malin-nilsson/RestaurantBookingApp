import { StyledMediumHeading } from "../styled-components/Headings/StyledHeadings";
import { StyledFlexDiv } from "../styled-components/Wrappers/StyledFlex";

export default function AdminPermission() {
  return (
    <>
      <StyledFlexDiv direction="column" justify="center" padding="5rem">
        <StyledMediumHeading>Access denied!</StyledMediumHeading>
      </StyledFlexDiv>
    </>
  );
}
