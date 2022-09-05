import { IGuest } from '../../models/IGuest'
import { StyledButton } from '../styled-components/Buttons/StyledButtons'
import { StyledMediumHeading } from '../styled-components/Headings/StyledHeadings'
import {
  StyledFlexDiv,
  StyledHeadingWrapper,
} from '../styled-components/Wrappers/StyledFlex'

interface AdminShowGuestProps {
  guest: IGuest
  setShowGuest(show: boolean): void
  setShowBookings(show: boolean): void
  confirmGuestDelete(guest: IGuest): void
}
export default function AdminShowGuest(props: AdminShowGuestProps) {
  return (
    <>
      {props.guest && (
        <StyledFlexDiv>
          <div className="guest-card">
            <StyledHeadingWrapper width="100%">
              <div>
                <span
                  onClick={() => {
                    props.setShowGuest(false)
                    props.setShowBookings(true)
                  }}
                  className="material-symbols-outlined arrow"
                >
                  arrow_back_ios
                </span>
              </div>

              <div>
                <StyledMediumHeading>Guest information</StyledMediumHeading>
              </div>

              <div></div>
            </StyledHeadingWrapper>
            <div className="guest-details">
              <span className="material-symbols-outlined">person</span>
              <span className="guest-name"> {props.guest.name} </span>
            </div>
            <div className="guest-details">
              <span className="guest-detail-bold">Email: </span>{' '}
              <span> {props.guest.email} </span>
            </div>
            <div className="guest-details">
              <span className="guest-detail-bold">Phone: </span>{' '}
              <span> {props.guest.phone} </span>
            </div>

            <StyledButton onClick={() => props.confirmGuestDelete(props.guest)}>
              Delete account
            </StyledButton>
          </div>
        </StyledFlexDiv>
      )}
    </>
  )
}
