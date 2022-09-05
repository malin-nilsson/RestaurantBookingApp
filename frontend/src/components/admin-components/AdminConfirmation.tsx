import { IBooking } from '../../models/IBooking'
import { ICancellation } from '../../models/ICancellation'
import { IReservation } from '../../models/IReservation'
import { StyledSmallHeading } from '../styled-components/Headings/StyledHeadings'
import { StyledFlexDiv } from '../styled-components/Wrappers/StyledFlex'

interface AdminConfirmProps {
  specificBooking?: IBooking
  cancelledBooking?: ICancellation
  message: string
}

export default function AdminConfirmation(props: AdminConfirmProps) {
  return (
    <>
      <StyledSmallHeading fontWeight="900" padding="0px 0px 15px">
        {props.message}
      </StyledSmallHeading>
      <StyledSmallHeading display="flex" fontSize="1.6rem" padding="20px 0px">
        {props.specificBooking && (
          <StyledFlexDiv>
            <span>
              {props.specificBooking.date} – {props.specificBooking.time}:00 pm
              – {props.specificBooking.guest.name} -{' '}
              {props.specificBooking.amount === 1
                ? props.specificBooking.amount + ' guest'
                : props.specificBooking.amount + ' guests'}
            </span>
          </StyledFlexDiv>
        )}
        {props.cancelledBooking && (
          <span>
            {props.cancelledBooking.date} – {props.cancelledBooking.time}:00 pm
            – {props.cancelledBooking.name} -
            {props.cancelledBooking.amount === 1
              ? props.cancelledBooking.amount + ' guest'
              : props.cancelledBooking.amount + ' guests'}
          </span>
        )}
      </StyledSmallHeading>
    </>
  )
}
