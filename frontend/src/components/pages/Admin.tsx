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
import { StyledLoader } from '../styled-components/Loader/StyledLoader'

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
  const [adminHeader, setAdminHeader] = useState(true)
  const [bookingConfirmation, setBookingConfirmation] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const [cancelledBooking, setCancelledBooking] = useState<ICancellation>()
  const [notAvailable, setNotAvailable] = useState(false)
  const [loader, setLoader] = useState<Boolean>(false)
  const [selectedBooking, setSelectedBooking] = useState<IReservation[]>()
  const [noResultsMessage, setNoResultsMessage] = useState('')
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

  const stopLoader = () => {
    setLoader(false)
    setShowBookings(true)
  }

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
      setNoResultsMessage('')
      setLoader(true)
      setTimeout(stopLoader, 1000)
      setFilteredBookings(filteredBookings)
      setShowBookings(false)
    } else {
      setFilteredBookings([])
      setNoResultsMessage("Sorry, we couldn't find any reservations.")
    }
  }

  const showEditForm = (clickedBooking: IReservation) => {
    setShowBookings(false)
    setEditForm(true)
    setAdminHeader(false)
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
    reservation: IReservation,
  ) => {
    e.preventDefault()

    if (date && time && amount) {
      setError(false)

      const editedBooking: IReservation = {
        _id: reservation._id,
        date: date,
        time: time,
        amount: amount,
        message: message,
        guestName: reservation.guestName,
        guestEmail: reservation.guestEmail,
        guestPhone: reservation.guestPhone,
      }
      setSpecificBooking(editedBooking)

      const isAvailable = getAvailability(editedBooking)
      isAvailable.then(function (result) {
        if (result === true) {
          saveEditedBooking(editedBooking)
          bookings.updateBooking(editedBooking)
          setEditForm(false)
          setBookingConfirmation(true)
          window.scrollTo(0, 0)
          setError(false)
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

  const toggleForms = () => {
    window.scrollTo(0, 0)
    setAdminHeader(true)
    setBookingConfirmation(false)
  }

  return (
    <>
      {adminHeader && (
        <StyledFlexDiv>
          <StyledForm border="none" onSubmit={searchBookings}>
            <StyledMediumHeading margin="0px 0px 10px">
              Admin
            </StyledMediumHeading>

            <input
              type="text"
              required={true}
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
              placeholder="Search by name, email or booking ID..."
            />
            <StyledButton>Search reservations</StyledButton>
            <StyledLinkWrapper>
              <Link to="/admin/create">Add new reservation</Link>
            </StyledLinkWrapper>
          </StyledForm>
          {loader && <StyledLoader margin="0px auto"></StyledLoader>}
        </StyledFlexDiv>
      )}

      <StyledFlexDiv>
        <StyledParagraph>{noResultsMessage}</StyledParagraph>

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
              <StyledHeadingWrapper>
                <div>
                  <span
                    onClick={() => {
                      setAdminHeader(true)
                      setEditForm(false)
                    }}
                    className="material-symbols-outlined arrow"
                  >
                    arrow_back_ios
                  </span>
                </div>

                <div>
                  <StyledMediumHeading>Edit reservation</StyledMediumHeading>
                </div>

                <div></div>
              </StyledHeadingWrapper>
              <StyledSmallHeading fontSize="1.5rem" padding="10px">
                <div className="booking-details">
                  <span>
                    {specificBooking.guestName} – {specificBooking.date} –{' '}
                    {specificBooking.time}:00 pm – Guests:{' '}
                    {specificBooking.amount}
                  </span>
                </div>
              </StyledSmallHeading>
              <div className="form-field">
                {notAvailable && (
                  <div className="error-generic">
                    <StyledParagraph
                      fontSize="1.5rem"
                      padding="5px"
                      color="var(--green)"
                    >
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
                />
              </div>
              <div className="form-field gdpr">
                <input type="checkbox" required />
                <label>
                  I agree to the <Link to="/gdpr">terms and conditions</Link>
                </label>
              </div>
              <StyledButton>Edit reservation</StyledButton>
            </StyledForm>
          </>
        )}
      </StyledFlexDiv>

      {bookingConfirmation && (
        <StyledFlexDiv padding="100px 0px 0px">
          <StyledSmallHeading fontWeight="900" padding="0px 0px 15px">
            The reservation has been confirmed.
          </StyledSmallHeading>
          <StyledSmallHeading fontSize="1.5rem">
            <span>
              {specificBooking.date} – {specificBooking.time}:00 pm –{' '}
              {specificBooking.guestName} – Guests: {specificBooking.amount}
            </span>
          </StyledSmallHeading>

          <StyledButton onClick={toggleForms} margin="40px 0px">
            Back to Admin page
          </StyledButton>
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
