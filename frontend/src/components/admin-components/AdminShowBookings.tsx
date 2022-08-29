import { IReservation } from '../../models/IReservation'
import { StyledList } from '../styled-components/List/StyledList'
import { StyledParagraph } from '../styled-components/Text/StyledParagraph'

interface AdminBookingProps {
  reservations: IReservation[]
  showEditForm(booking: IReservation): void
  confirmDelete(booking: IReservation): void
}

export default function AdminShowBookings(props: AdminBookingProps) {
  return (
    <>
      <StyledParagraph textAlign="left" fontSize="1.7rem">
        <span className="material-symbols-outlined">restaurant_menu</span>

        {props.reservations.length === 1
          ? props.reservations.length + ' reservation found'
          : props.reservations.length + ' reservations found'}
      </StyledParagraph>

      <StyledList>
        {props.reservations.map((booking: IReservation) => {
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
                  {booking.guestName}
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
                  {booking.guestEmail}
                </span>
                <span>
                  <span className="title-bold">Phone: </span>
                  {booking.guestPhone}
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
  )
}
