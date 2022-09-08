import { useEffect, useState } from 'react'
// MODELS //
import { IBooking } from '../../models/IBooking'
import { IGuest } from '../../models/IGuest'
// STYLED COMPONENTS //
import {
  StyledButton,
  StyledGreenButton,
} from '../styled-components/Buttons/StyledButtons'
import { StyledList } from '../styled-components/List/StyledList'
import { StyledParagraph } from '../styled-components/Text/StyledParagraph'
import { StyledFlexDiv } from '../styled-components/Wrappers/StyledFlex'

interface AdminBookingProps {
  filteredByDate?: IBooking[]
  list: IBooking[]
  guest?: IGuest
  showEditForm(booking: IBooking): void
  showGuestAccount(guest: IGuest): void
  confirmDelete(booking: IBooking): void
}

export default function AdminShowBookings(props: AdminBookingProps) {
  const [bookingsByGuest, setBookingsByGuest] = useState(false)
  const [bookingsByDate, setBookingsByDate] = useState(false)

  useEffect(() => {
    if (props.list && props.list.length > 0) {
      setBookingsByGuest(true)
    } else if (props.list && props.list.length === 0) {
      setBookingsByGuest(false)
    } else if (props.filteredByDate && props.filteredByDate.length > 0) {
      setBookingsByDate(true)
    } else if (props.filteredByDate && props.filteredByDate.length === 0) {
      setBookingsByDate(false)
    }
  }, [bookingsByDate, bookingsByGuest])

  return (
    <>
      {bookingsByGuest && props.list && (
        <>
          {props.list.length === 1 && (
            <>
              <StyledParagraph fontSize="1.7rem" padding="50px 0px 20px">
                <span className="material-symbols-outlined">
                  restaurant_menu
                </span>
                {props.list.length} reservation found
              </StyledParagraph>
              <StyledFlexDiv>
                <span className="material-symbols-outlined arrowdown">
                  expand_more
                </span>
              </StyledFlexDiv>
            </>
          )}

          {props.list.length >= 2 && (
            <>
              <StyledParagraph fontSize="1.7rem" padding="50px 0px 20px">
                <>
                  <span className="material-symbols-outlined">
                    restaurant_menu
                  </span>
                  {props.list.length} reservations found
                </>
              </StyledParagraph>

              <StyledFlexDiv>
                <span className="material-symbols-outlined arrowdown">
                  expand_more
                </span>
              </StyledFlexDiv>
            </>
          )}

          {props.list && (
            <>
              <StyledList>
                {props.list.map((booking: IBooking) => {
                  return (
                    <li key={booking._id}>
                      <div className="booking">
                        <span className="booking-heading">Booking:</span>

                        <span>
                          <span className="title-bold">Date: </span>
                          {booking.date} - {booking.time}:00 pm{' '}
                        </span>

                        <span>
                          <span className="title-bold">Booking ID: </span>
                          <span>{booking._id}</span>
                        </span>

                        <span>
                          <span className="title-bold">Number of guests: </span>
                          {booking.amount}
                        </span>
                        <span>
                          <span className="title-bold">Tables: </span>
                          {booking.tables}
                        </span>

                        <span>
                          <span className="title-bold">Message: </span>
                          {booking.message}
                        </span>
                        <div className="button-wrapper">
                          <StyledGreenButton
                            padding="15px"
                            fontSize="1.4rem"
                            onClick={() => props.showEditForm(booking)}
                          >
                            <span className="material-symbols-outlined">
                              edit
                            </span>{' '}
                            Edit booking{' '}
                          </StyledGreenButton>
                          <StyledGreenButton
                            padding="15px"
                            fontSize="1.4rem"
                            onClick={() => props.confirmDelete(booking)}
                          >
                            <span className="material-symbols-outlined">
                              delete
                            </span>
                            Delete booking{' '}
                          </StyledGreenButton>
                        </div>

                        <span className="booking-heading">
                          Guest information:
                        </span>
                        <span>
                          <span className="title-bold">Name: </span>
                          <span>{booking.guest.name}</span>
                        </span>

                        <span>
                          <span className="title-bold">Email: </span>
                          <span>{booking.guest.email}</span>
                        </span>

                        <span>
                          <span className="title-bold">Phone number: </span>
                          <span>{booking.guest.phone}</span>
                        </span>
                      </div>
                      <StyledFlexDiv align="flex-start">
                        <StyledGreenButton
                          padding="15px"
                          fontSize="1.4rem"
                          onClick={() => props.showGuestAccount(booking.guest)}
                        >
                          <span className="material-symbols-outlined">
                            person
                          </span>{' '}
                          Show guest account{' '}
                        </StyledGreenButton>
                      </StyledFlexDiv>
                    </li>
                  )
                })}
              </StyledList>
            </>
          )}
        </>
      )}
    </>
  )
}
