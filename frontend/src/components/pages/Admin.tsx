import { FormEvent, useContext, useEffect, useState } from 'react'
import { BookingContext } from '../../context/BookingContext'
import { IAdmin } from '../../models/IAdmin'
import { IReservation } from '../../models/IReservation'
import { getAdmin } from '../../services/adminService'
import { StyledButton } from '../styled-components/Button/StyledButton'
import { StyledForm } from '../styled-components/Form/StyledForm'
import {
  StyledMediumHeading,
  StyledSmallHeading,
} from '../styled-components/Headings/Headings'
import { StyledList } from '../styled-components/List/StyledList'
import { StyledParagraph } from '../styled-components/Text/StyledParagraph'
import { StyledFlexDiv } from '../styled-components/Wrappers/StyledFlex'

export default function Admin() {
  let bookings = useContext(BookingContext)
  const [searchInput, setSearchInput] = useState('')
  const [bookingsByGuest, setBookingsByGuest] = useState<IReservation[]>()
  const [message, setMessage] = useState('')

  const getBookingsFromGuest = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    searchInput.trim()
    setSearchInput('')

    const listOfBookings: IReservation[] = bookings.bookings.filter(
      (booking) =>
        booking.guestName.toLowerCase() === searchInput.toLowerCase() ||
        booking.guestEmail.toLowerCase() === searchInput.toLowerCase() ||
        booking._id === searchInput,
    )
    if (listOfBookings.length > 0) {
      setMessage('')
      setBookingsByGuest(listOfBookings)
    } else {
      setBookingsByGuest([])
      setMessage("We couldn't find any reservations.")
    }
  }

  const deleteBooking = () => {}

  const editBooking = () => {}

  // const [admin, setAdmin] = useState<IAdmin[]>([])

  // useEffect(() => {
  //   getAdmin()
  //     .then((res) => {
  //       console.log(res)
  //       setAdmin(res)
  //     })
  //     .catch((e) => {
  //       console.log(e)
  //     })
  // }, [])

  return (
    <>
      {/* {admin.map((admin) => {
        return <h1 key={admin.username}>{admin.username}</h1>;
      })} */}

      <StyledFlexDiv>
        <StyledMediumHeading padding="0px 0px 20px">Admin</StyledMediumHeading>
        <StyledForm onSubmit={getBookingsFromGuest}>
          <input
            type="text"
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            placeholder="Search by name, email or booking ID..."
          />
          <StyledButton>Search reservations</StyledButton>
        </StyledForm>
      </StyledFlexDiv>

      <StyledFlexDiv padding="20px 0px 0px">
        <StyledSmallHeading>Reservations</StyledSmallHeading>
        <StyledParagraph>{message}</StyledParagraph>

        <StyledList>
          {bookingsByGuest && (
            <>
              {bookingsByGuest.map((booking: IReservation) => {
                return (
                  <li key={booking._id}>
                    <div className="icons">
                      <span
                        onClick={deleteBooking}
                        className="material-symbols-outlined"
                      >
                        delete
                      </span>
                      <span
                        onClick={editBooking}
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
                        <span className="title-bold">Date: </span>
                        {booking.date} - {booking.time}:00 pm{' '}
                      </span>

                      <span>
                        <span className="title-bold">Number of guests: </span>
                        {booking.amount}
                      </span>
                      <span>
                        <span className="title-bold"> Guest: </span>
                        {booking.guestName}
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
            </>
          )}
        </StyledList>
      </StyledFlexDiv>
    </>
  )
}
