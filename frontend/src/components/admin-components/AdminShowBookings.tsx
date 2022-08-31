import { useEffect, useState } from 'react'
import { IBooking } from '../../models/IBooking'
import { IGuest } from '../../models/IGuest'
import { IReservation } from '../../models/IReservation'
import { StyledList } from '../styled-components/List/StyledList'
import { StyledParagraph } from '../styled-components/Text/StyledParagraph'

interface AdminBookingProps {
  filteredByDate?: IBooking[]
  filteredByGuest?: IBooking[]
  guest?: IGuest
  showEditForm(booking: IBooking): void
  confirmDelete(booking: IBooking): void
}

export default function AdminShowBookings(props: AdminBookingProps) {
  const [bookingsByGuest, setBookingsByGuest] = useState(false)
  const [bookingsByDate, setBookingsByDate] = useState(false)
  const [noResultsMessage, setNoResultsMessage] = useState(false)

  useEffect(() => {
    if (props.filteredByGuest && props.filteredByGuest.length > 0) {
      setBookingsByGuest(true)
    } else if (props.filteredByGuest && props.filteredByGuest.length === 0) {
      setBookingsByGuest(false)
      setNoResultsMessage(true)
    } else if (props.filteredByDate && props.filteredByDate.length > 0) {
      setBookingsByDate(true)
    } else if (props.filteredByDate && props.filteredByDate.length === 0) {
      setBookingsByDate(false)
      setNoResultsMessage(true)
    }
  }, [])

  return (
    <>
      {bookingsByGuest && props.filteredByGuest && (
        <>
          <StyledParagraph textAlign="left" fontSize="1.7rem" padding="5px">
            {props.filteredByGuest.length === 1 && (
              <>
                <span className="material-symbols-outlined">
                  restaurant_menu
                </span>
                {props.filteredByGuest.length} reservation found
              </>
            )}

            {props.filteredByGuest.length === 0 && (
              <>
                <span className="material-symbols-outlined">
                  restaurant_menu
                </span>
                {props.filteredByGuest.length} reservations found
              </>
            )}
          </StyledParagraph>

          {props.filteredByGuest.length > 0 && (
            <StyledParagraph>
              <span className="material-symbols-outlined">restaurant_menu</span>
              {props.filteredByGuest.length} reservations found
            </StyledParagraph>
          )}

          {props.guest && props.filteredByGuest.length > 0 && (
            <StyledParagraph padding="0px 0px 10px" fontWeight="900">
              <span className="material-symbols-outlined">person</span>
              {props.guest.email}
            </StyledParagraph>
          )}

          {props.filteredByGuest && (
            <>
              <StyledList>
                {props.filteredByGuest.map((booking: IBooking) => {
                  return (
                    <li key={booking._id}>
                      <div className="icons">
                        <span
                          onClick={() => props.confirmDelete(booking)}
                          className="material-symbols-outlined"
                        >
                          delete
                        </span>
                        <span
                          onClick={() => props.showEditForm(booking)}
                          className="material-symbols-outlined"
                        >
                          edit
                        </span>
                      </div>
                      <div className="booking">
                        <span>
                          <span className="title-bold">Booking ID: </span>
                          <span>{booking._id}</span>
                        </span>
                        <span>
                          <span className="title-bold">Name: </span>
                          {booking.guest.name}
                        </span>
                        <span>
                          <span className="title-bold">Date: </span>
                          {booking.date} - {booking.time}:00 pm{' '}
                        </span>

                        <span>
                          <span className="title-bold">Number of guests: </span>
                          {booking.amount}
                        </span>
                        <span>
                          <span className="title-bold">Tables: </span>
                          {booking.tables}
                        </span>
                      </div>

                      <div className="booking">
                        <span>
                          <span className="title-bold">Email: </span>
                          {booking.guest.email}
                        </span>
                        <span>
                          <span className="title-bold">Phone: </span>
                          {booking.guest.phone}
                        </span>
                      </div>

                      <div className="booking">
                        <span className="title-bold">Message: </span>
                        <span>{booking.message}</span>
                      </div>
                    </li>
                  )
                })}
              </StyledList>
            </>
          )}
        </>
      )}

      {bookingsByDate && props.filteredByDate && (
        <>
          <StyledParagraph textAlign="left" fontSize="1.7rem" padding="5px">
            {props.filteredByDate.length === 1 && (
              <>
                <span className="material-symbols-outlined">
                  restaurant_menu
                </span>
                {props.filteredByDate.length} reservation found
              </>
            )}

            {props.filteredByDate.length === 0 && (
              <>
                <span className="material-symbols-outlined">
                  restaurant_menu
                </span>
                {props.filteredByDate.length} reservations found
              </>
            )}
          </StyledParagraph>

          {props.filteredByDate.length > 2 && (
            <StyledParagraph>
              <span className="material-symbols-outlined">restaurant_menu</span>
              {props.filteredByDate.length} reservations found
            </StyledParagraph>
          )}
          {props.filteredByDate && (
            <>
              <StyledList>
                {props.filteredByDate.map((booking: IBooking) => {
                  return (
                    <li key={booking._id}>
                      <div className="icons">
                        <span
                          onClick={() => props.confirmDelete(booking)}
                          className="material-symbols-outlined"
                        >
                          delete
                        </span>
                        <span
                          onClick={() => props.showEditForm(booking)}
                          className="material-symbols-outlined"
                        >
                          edit
                        </span>
                      </div>
                      <div className="booking">
                        <span>
                          <span className="title-bold">Booking ID: </span>
                          <span>{booking._id}</span>
                        </span>
                        <span>
                          <span className="title-bold">Name: </span>
                          {booking.guest.name}
                        </span>
                        <span>
                          <span className="title-bold">Date: </span>
                          {booking.date} - {booking.time}:00 pm{' '}
                        </span>

                        <span>
                          <span className="title-bold">Number of guests: </span>
                          {booking.amount}
                        </span>
                        <span>
                          <span className="title-bold">Tables: </span>
                          {booking.tables}
                        </span>
                      </div>

                      <div className="booking">
                        <span>
                          <span className="title-bold">Email: </span>
                          {booking.guest.email}
                        </span>
                        <span>
                          <span className="title-bold">Phone: </span>
                          {booking.guest.phone}
                        </span>
                      </div>

                      <div className="booking">
                        <span className="title-bold">Message: </span>
                        <span>{booking.message}</span>
                      </div>
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
