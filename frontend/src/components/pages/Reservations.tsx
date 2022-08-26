import { FormEvent, useContext, useState } from 'react'
// REACT ROUTER //
import { Link } from 'react-router-dom'
// SERVICES //
import { getAvailability } from '../../services/getAvailability'
import { limitPastDates } from '../../services/limitDate'
import { saveBooking } from '../../services/saveBooking'
// MODELS//
import { IReservation } from '../../models/IReservation'
import { IBookingRequest } from '../../models/IBookingRequest'
// STYLED COMPONENTS //
import { StyledForm } from '../styled-components/Form/StyledForm'
import {
  StyledFlexDiv,
  StyledHeadingWrapper,
} from '../styled-components/Wrappers/StyledFlex'
import {
  StyledMediumHeading,
  StyledSmallHeading,
} from '../styled-components/Headings/StyledHeadings'
import { StyledButton } from '../styled-components/Button/StyledButton'
import { StyledLoader } from '../styled-components/Loader/StyledLoader'
import { StyledParagraph } from '../styled-components/Text/StyledParagraph'
import { BookingContext } from '../../context/BookingContext'

export default function Book() {
  let bookings = useContext(BookingContext)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [amount, setAmount] = useState(0)
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState(false)
  const [loader, setLoader] = useState<Boolean>(false)
  const [guestForm, setGuestForm] = useState(false)
  const [bookingForm, setBookingForm] = useState(true)
  const [confirmation, setConfirmation] = useState(false)
  const [notAvailable, setNotAvailable] = useState(false)
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
    setGuestForm(false)
    setConfirmation(true)
  }

  const checkAvailability = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (date && time && amount) {
      const newBookingRequest: IBookingRequest = {
        date: date,
        time: time,
        amount: amount,
      }
      setError(false)
      const isAvailable = getAvailability(newBookingRequest)
      isAvailable.then(function (result) {
        if (result.valueOf() === true) {
          setBookingForm(false)
          window.scrollTo(0, 0)
          setGuestForm(true)
        } else {
          setBookingForm(true)
          setNotAvailable(true)
        }
      })
    } else {
      setError(true)
    }
  }

  const confirmBooking = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (name && email && phone) {
      setGuestForm(false)
      setLoader(true)
      setTimeout(stopLoader, 1000)

      const newBooking: IReservation = {
        date: date,
        time: time,
        amount: +amount,
        message: message,
        guestName: name,
        guestEmail: email,
        guestPhone: phone,
      }
      setSpecificBooking(newBooking)
      saveBooking(newBooking)
      bookings.addBooking(newBooking)
      setError(false)
      setName('')
      setEmail('')
      setPhone('')
    } else {
      setError(true)
    }
  }

  const toggleForms = () => {
    window.scrollTo(0, 0)
    setGuestForm(false)
    setError(false)
    setBookingForm(true)
    setNotAvailable(false)
  }

  return (
    <div>
      <StyledFlexDiv>
        {loader && <StyledLoader></StyledLoader>}
        {bookingForm && (
          <>
            <StyledForm onSubmit={checkAvailability}>
              <StyledMediumHeading>Make a Reservation</StyledMediumHeading>
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
                  placeholder="Time"
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
              <StyledButton>Find a table</StyledButton>
            </StyledForm>
          </>
        )}

        {guestForm && (
          <>
            <StyledForm onSubmit={confirmBooking}>
              <StyledHeadingWrapper>
                <div>
                  <span
                    onClick={toggleForms}
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
              <StyledParagraph padding="10px 5px 0px">
                {`${date}`}
                <span className="material-symbols-outlined">
                  restaurant_menu
                </span>
                {`${time}:00 pm`}
              </StyledParagraph>
              <StyledParagraph fontSize="1.6rem" padding="0px 0px 15px">
                {amount === 1 ? amount + ' guest' : amount + ' guests'}
              </StyledParagraph>
              {error && (
                <div className="error-generic">
                  All fields must be filled out.
                </div>
              )}
              <div className="form-field">
                <label>Name *</label>
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  className={error && !name ? 'error-input' : ''}
                  placeholder="Name"
                  value={name}
                />
              </div>

              <div className="form-field">
                <label>Email *</label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className={error && !email ? 'error-input' : ''}
                  placeholder="Email"
                  value={email}
                />
              </div>

              <div className="form-field">
                <label>Phone *</label>
                <input
                  type="tel"
                  onChange={(e) => setPhone(e.target.value)}
                  className={error && !phone ? 'error-input' : ''}
                  placeholder="Phone"
                  value={phone}
                />
              </div>
              <div className="form-field gdpr">
                <input type="checkbox" required />
                <label>
                  I agree to the <Link to="/gdpr">terms and conditions</Link>
                </label>
              </div>
              <StyledButton>Confirm booking</StyledButton>
            </StyledForm>
          </>
        )}
      </StyledFlexDiv>

      {confirmation && (
        <StyledFlexDiv padding="130px 0px">
          <StyledSmallHeading fontWeight="900" padding="0px 0px 15px">
            Your reservation is confirmed, {specificBooking.guestName}.
          </StyledSmallHeading>
          <StyledSmallHeading fontSize="1.7rem">
            We look forward to seeing you soon.
          </StyledSmallHeading>
          <StyledSmallHeading fontSize="1.7rem" padding="20px 0px">
            <span>
              {specificBooking.date}, {specificBooking.time}:00 pm
            </span>
          </StyledSmallHeading>
          <Link to="/">
            <StyledButton margin="40px 0px">Back home</StyledButton>
          </Link>
        </StyledFlexDiv>
      )}
    </div>
  )
}
