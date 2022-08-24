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
import {
  StyledFlexDiv,
  StyledHeadingWrapper,
} from '../styled-components/Wrappers/StyledFlex'
import { deleteBooking } from '../../services/deleteBooking'
import { ICancellation } from '../../models/ICancellation'
import { StyledLinkWrapper } from '../styled-components/Wrappers/StyledLinkWrapper'

export default function Admin() {
  let bookings = useContext(BookingContext)
  const [searchInput, setSearchInput] = useState('')
  const [filteredBookings, setFilteredBookings] = useState<IReservation[]>()
  const [message, setMessage] = useState('')
  const [editForm, setEditForm] = useState(false)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [amount, setAmount] = useState(0)
  const [error, setError] = useState(false)
  const [bookingConfirmation, setBookingConfirmation] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const [cancelledBooking, setCancelledBooking] = useState<ICancellation>()
  const [notAvailable, setNotAvailable] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<IReservation[]>()
  const [showBookings, setShowBookings] = useState(true)
  const [specificBooking, setSpecificBooking] = useState<IReservation>({
    _id: '',
    date: '',
    time: '',
    amount: 0,
    message: '',
    guestName: '',
    guestEmail: '',
    guestPhone: '',
  })

  const searchBookings = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setEditForm(false)
    setBookingConfirmation(false)
    setShowBookings(true)
    setDeleteConfirmation(false)
    searchInput.trim()
    setSearchInput('')

    const filteredBookings: IReservation[] = bookings.bookings.filter(
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

    if (filteredBookings.length > 0) {
      setMessage('')
      setFilteredBookings(filteredBookings)
    } else {
      setFilteredBookings([])
      setMessage("We couldn't find any reservations.")
    }
  }

  const showEditForm = (clickedBooking: IReservation) => {
    setShowBookings(false)
    setEditForm(true)
    setSpecificBooking(clickedBooking)
    const bookingToEdit = bookings.bookings.filter(
      (booking) => booking._id === clickedBooking._id,
    )
    setSelectedBooking(bookingToEdit)
    setNotAvailable(false)
    setDate('')
    setTime('')
    setAmount(0)
    setMessage('')
  }

  const handleEdit = async (
    e: FormEvent<HTMLFormElement>,
    booking: IReservation,
  ) => {
    e.preventDefault()

    if (date && time && amount) {
      setError(false)
      const isAvailable = getAvailability(specificBooking)
      isAvailable.then(function (result) {
        if (result === true) {
          setEditForm(false)
          setBookingConfirmation(true)
          window.scrollTo(0, 0)
          setError(false)
          saveEditedBooking(specificBooking)
          bookings.updateBooking(specificBooking)
        } else {
          setEditForm(true)
          setNotAvailable(true)
        }
      })
    } else {
      setError(true)
    }
  }

  const confirmDelete = (booking: IReservation) => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      const deletedBooking: ICancellation = {
        date: booking.date,
        time: booking.time,
        amount: booking.amount,
        name: booking.guestName,
      }
      setShowBookings(false)
      setDeleteConfirmation(true)
      deleteBooking(booking)
      bookings.deleteBooking(booking)
      setCancelledBooking(deletedBooking)
    } else {
      return
    }
  }

  return (
    <>
      <StyledFlexDiv>
        <StyledMediumHeading>Admin</StyledMediumHeading>

        <StyledForm border="none" onSubmit={searchBookings}>
          <input
            type="text"
            required={true}
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            placeholder="Search by name, email or booking ID..."
          />
          <StyledButton>Search reservations</StyledButton>
        </StyledForm>
        <StyledLinkWrapper>
          <Link to="/admin/create">Add new reservation</Link>
        </StyledLinkWrapper>
      </StyledFlexDiv>

      <StyledFlexDiv padding="20px 0px 0px">
        <StyledParagraph>{message}</StyledParagraph>

        {showBookings && filteredBookings && (
          <StyledList>
            {filteredBookings.map((booking: IReservation) => {
              return (
                <li key={booking._id}>
                  <div className="icons">
                    <span
                      onClick={() => confirmDelete(booking)}
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
        {editForm && specificBooking && (
          <>
            <StyledForm onSubmit={(e) => handleEdit(e, specificBooking)}>
              <StyledMediumHeading fontSize="2rem">
                Edit Reservation
              </StyledMediumHeading>
              <StyledSmallHeading fontSize="1.5rem" padding="10px">
                <span>
                  {specificBooking.guestName} – {specificBooking.date} –{' '}
                  {specificBooking.time}:00 pm – Guests:{' '}
                  {specificBooking.amount}
                </span>
              </StyledSmallHeading>
              <div className="form-field">
                {notAvailable && (
                  <div className="error-generic">
                    <StyledParagraph fontSize="1.5rem" padding="5px">
                      Uh oh, it looks like that seating is fully booked.
                    </StyledParagraph>
                  </div>
                )}
                {error && (
                  <div className="error-generic">
                    Please fill out missing fields.
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
                  placeholder={specificBooking.message}
                />
              </div>
              <StyledButton>Edit reservation</StyledButton>
            </StyledForm>
          </>
        )}
      </StyledFlexDiv>

      {bookingConfirmation && (
        <StyledFlexDiv padding="50px 0px">
          <StyledSmallHeading fontWeight="900" padding="0px 0px 15px">
            The reservation has been confirmed.
          </StyledSmallHeading>
          <StyledSmallHeading fontSize="1.5rem">
            <span>
              {specificBooking.date} – {specificBooking.time}:00 pm –{' '}
              {specificBooking.guestName} – Guests: {specificBooking.amount}
            </span>
          </StyledSmallHeading>
        </StyledFlexDiv>
      )}

      {deleteConfirmation && cancelledBooking && (
        <StyledFlexDiv padding="50px 0px" direction="column">
          <StyledSmallHeading
            fontWeight="100"
            padding="0px 0px 15px"
            fontSize="2.3rem"
            display="flex"
            direction="column"
            gap="20px"
          >
            This reservation has been cancelled.
            <span>
              {cancelledBooking.date} – {cancelledBooking.time}:00 pm –{' '}
              {cancelledBooking.name} –{' '}
              {cancelledBooking.amount === 1
                ? cancelledBooking.amount + ' guest'
                : cancelledBooking.amount + ' guests'}
            </span>
          </StyledSmallHeading>
        </StyledFlexDiv>
      )}
    </>
  )
}
