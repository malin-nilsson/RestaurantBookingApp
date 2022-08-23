import { time } from 'console'
import { error } from 'cypress/types/jquery'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookingContext } from '../../context/BookingContext'
import { IAdmin } from '../../models/IAdmin'
import { IBooking } from '../../models/IBooking'
import { IReservation } from '../../models/IReservation'
import { getAdmin } from '../../services/adminService'
import { saveEditedBooking } from '../../services/saveEditedBooking'
import { getAvailability } from '../../services/getAvailability'
import { BookingsList } from '../../services/getBookings'
import { limitPastDates } from '../../services/limitDate'
import { StyledButton } from '../styled-components/Button/StyledButton'
import { StyledForm } from '../styled-components/Form/StyledForm'
import {
  StyledMediumHeading,
  StyledSmallHeading,
} from '../styled-components/Headings/StyledHeadings'
import { StyledList } from '../styled-components/List/StyledList'
import { StyledParagraph } from '../styled-components/Text/StyledParagraph'
import { StyledFlexDiv } from '../styled-components/Wrappers/StyledFlex'

export default function Admin() {
  let bookings = useContext(BookingContext)
  const [searchInput, setSearchInput] = useState('')
  const [bookingsByGuest, setBookingsByGuest] = useState<IReservation[]>()
  const [message, setMessage] = useState('')
  const [editForm, setEditForm] = useState(false)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [amount, setAmount] = useState(0)
  const [error, setError] = useState(false)
  const [confirmation, setConfirmation] = useState(false)
  const [notAvailable, setNotAvailable] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<IReservation[]>()
  const [showBookings, setShowBookings] = useState(true)

  const getBookingsFromGuest = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setEditForm(false)
    setConfirmation(false)
    setShowBookings(true)
    searchInput.trim()
    setSearchInput('')

    const listOfBookings: IReservation[] = bookings.bookings.filter(
      (booking) =>
        Object.values(booking.guestName)
          .join('')
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        Object.values(booking.guestEmail)
          .join('')
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
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

  const showEditForm = (chosenBooking: IReservation) => {
    setShowBookings(false)
    setEditForm(true)
    const bookingToEdit = bookings.bookings.filter(
      (booking) => booking._id === chosenBooking._id,
    )
    setSelectedBooking(bookingToEdit)
  }

  const handleEdit = async (
    e: FormEvent<HTMLFormElement>,
    booking: IReservation,
  ) => {
    e.preventDefault()

    if (date && time && amount) {
      const newBookingRequest: IReservation = {
        _id: booking._id,
        date: date,
        time: time,
        amount: amount,
        message: message,
        guestName: booking.guestName,
        guestEmail: booking.guestEmail,
        guestPhone: booking.guestPhone,
      }
      setError(false)
      const isAvailable = getAvailability(newBookingRequest)
      isAvailable.then(function (result) {
        if (result === true) {
          setEditForm(false)
          setConfirmation(true)
          window.scrollTo(0, 0)
          saveEditedBooking(newBookingRequest)
          bookings.updateBooking(newBookingRequest)
        } else {
          setEditForm(true)
          setNotAvailable(true)
        }
      })
    } else {
      setError(true)
    }
  }

  return (
    <>
      <StyledFlexDiv>
        <StyledMediumHeading padding="0px 0px 20px">Admin</StyledMediumHeading>
        <StyledForm onSubmit={getBookingsFromGuest}>
          <input
            type="text"
            required={true}
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            placeholder="Search by name, email or booking ID..."
          />
          <StyledButton>Search reservations</StyledButton>
        </StyledForm>
      </StyledFlexDiv>

      <StyledFlexDiv padding="20px 0px 0px">
        <StyledParagraph>{message}</StyledParagraph>

        {showBookings && bookingsByGuest && (
          <StyledList>
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
                      onClick={() => showEditForm(booking)}
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
          </StyledList>
        )}
      </StyledFlexDiv>

      <StyledFlexDiv>
        {editForm && selectedBooking && (
          <>
            {selectedBooking.map((booking) => {
              return (
                <StyledForm onSubmit={(e) => handleEdit(e, booking)}>
                  <StyledMediumHeading>Edit Reservation</StyledMediumHeading>
                  <StyledSmallHeading fontSize="1.4rem">
                    {booking.guestName}, {booking.date}, Guests:{' '}
                    {booking.amount}
                  </StyledSmallHeading>
                  <div className="form-field">
                    {notAvailable && (
                      <div className="error-generic">
                        <StyledParagraph fontSize="1.5rem" padding="5px">
                          Uh oh, it looks like that seating is fully booked.
                        </StyledParagraph>
                      </div>
                    )}
                    <label>Date *</label>
                    <input
                      type="date"
                      min={limitPastDates()}
                      onChange={(e) => setDate(e.target.value)}
                      className={error && !date ? 'error-input' : ''}
                      value={date}
                    />
                  </div>

                  <div className="form-field">
                    <label>Time *</label>
                    <select
                      onChange={(e) => setTime(e.target.value)}
                      className={error && !time ? 'error-input' : ''}
                      value={time}
                    >
                      <option defaultValue={''}></option>
                      <option value="18">18:00 PM</option>
                      <option value="21">21:00 PM</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label>Number of Guests *</label>
                    <input
                      type="number"
                      min={1}
                      max={6}
                      onChange={(e) => setAmount(+e.target.value)}
                      className={error && !amount ? 'error-input' : ''}
                      value={amount}
                    />
                  </div>

                  <div className="form-field">
                    <label>
                      Message <span className="optional">(optional)</span>
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setMessage(e.target.value)}
                      value={message}
                      maxLength={100}
                      placeholder={booking.message}
                    />
                  </div>
                  <StyledButton>Find a table</StyledButton>
                  {error && (
                    <div className="error-generic">
                      Please fill out missing fields.
                    </div>
                  )}
                </StyledForm>
              )
            })}
          </>
        )}
      </StyledFlexDiv>

      {confirmation && (
        <StyledFlexDiv padding="50px 0px">
          <StyledSmallHeading fontWeight="900" padding="0px 0px 15px">
            The reservation has been confirmed.
          </StyledSmallHeading>
          <StyledParagraph>
            Date: {date}, Time: {time} pm, Guests: {amount}
          </StyledParagraph>
        </StyledFlexDiv>
      )}
    </>
  )
}
