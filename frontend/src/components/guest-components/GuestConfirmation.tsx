import { Link } from 'react-router-dom'
import { IReservation } from '../../models/IReservation'
import { StyledButton } from '../styled-components/Buttons/StyledButtons'
import { StyledSmallHeading } from '../styled-components/Headings/StyledHeadings'
import { StyledConfirmationWrapper } from '../styled-components/Wrappers/StyledConfirmationWrapper'
import { StyledFlexDiv } from '../styled-components/Wrappers/StyledFlex'

interface GuestConfirmationProps {
  specificBooking: IReservation
}
export default function GuestConfirmation(props: GuestConfirmationProps) {
  return (
    <StyledFlexDiv padding="160px 0px">
      <StyledConfirmationWrapper width="50%">
        <StyledSmallHeading fontWeight="900" padding="0px">
          Your reservation is confirmed, {props.specificBooking.guestName}.
        </StyledSmallHeading>

        <StyledSmallHeading fontSize="1.7rem" padding="40px 0px">
          <span>
            {props.specificBooking.date}, {props.specificBooking.time}:00 pm
          </span>
        </StyledSmallHeading>
        <StyledSmallHeading fontSize="1.7rem">
          We look forward to seeing you soon.
        </StyledSmallHeading>
        <StyledFlexDiv padding="20px 0px">
          <Link to="/">
            <StyledButton>Back home</StyledButton>
          </Link>
        </StyledFlexDiv>
      </StyledConfirmationWrapper>
    </StyledFlexDiv>
  )
}
