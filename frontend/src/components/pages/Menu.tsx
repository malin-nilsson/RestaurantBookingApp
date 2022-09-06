import React from 'react'
import { StyledMediumHeading } from '../styled-components/Headings/StyledHeadings'
import { StyledFlexDiv } from '../styled-components/Wrappers/StyledFlex'

export default function Menu() {
  window.scrollTo(0, 0)
  return (
    <StyledFlexDiv padding="0px">
      <div className="image-container">
        <img src="/assets/menu.png" />
      </div>
    </StyledFlexDiv>
  )
}
