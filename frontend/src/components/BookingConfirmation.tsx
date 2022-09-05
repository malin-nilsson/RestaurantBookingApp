import { Link } from 'react-router-dom'
import { IBooking } from '../models/IBooking'
import { StyledButton } from './styled-components/Buttons/StyledButtons'
import { StyledSmallHeading } from './styled-components/Headings/StyledHeadings'
import { StyledConfirmationWrapper } from './styled-components/Wrappers/StyledConfirmationWrapper'
import { StyledFlexDiv } from './styled-components/Wrappers/StyledFlex'

interface GuestConfirmationProps {
  specificBooking: IBooking
  padding: string
  width: string
  message: string
  url: string
}
export default function BookingConfirmation(props: GuestConfirmationProps) {
  return (
    <StyledFlexDiv padding={props.padding}>
      <StyledConfirmationWrapper width={props.width}>
        <StyledSmallHeading
          fontSize="3rem"
          fontWeight="100"
          padding="40px 0px 20px"
        >
          Confirmed
        </StyledSmallHeading>
        <span className="material-symbols-outlined">restaurant_menu</span>
        <StyledSmallHeading fontSize="1.6rem" padding="10px 0px">
          {props.message}
        </StyledSmallHeading>
        <StyledSmallHeading padding="15px 0px 20px">
          <span>
            {props.specificBooking.date}, {props.specificBooking.time}:00 pm
          </span>
        </StyledSmallHeading>
        <StyledFlexDiv>
          <Link to={props.url}>
            <StyledButton margin="20px 0px 0px">Go home</StyledButton>
          </Link>
        </StyledFlexDiv>
      </StyledConfirmationWrapper>
    </StyledFlexDiv>
  )
}
