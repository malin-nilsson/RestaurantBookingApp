import { FormEvent, useState } from 'react'
// REACT ROUTER //
import { Link } from 'react-router-dom'
// SERVICES //
import { getAvailability } from '../../services/getAvailability'
import { limitPastDates } from '../../services/limitDate'
import { saveBooking } from '../../services/saveBooking'
// MODELS//
import { IReservation } from '../../models/IReservation'
import { IBooking } from '../../models/IBooking'
// STYLED COMPONENTS //
import { StyledForm } from '../styled-components/Form/StyledForm'
import { StyledFlexDiv } from '../styled-components/Wrappers/StyledFlex'
import {
  StyledMediumHeading,
  StyledSmallHeading,
} from '../styled-components/Headings/Headings'
import { StyledButton } from '../styled-components/Button/StyledButton'
import { StyledLoader } from '../styled-components/Loader/Loader'
import { StyledParagraph } from '../styled-components/Text/StyledParagraph'

export default function Book() {
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

  const stopLoader = () => {
    setLoader(false)
    setGuestForm(false)
    setConfirmation(true)
  }

  const checkAvailability = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (date && time && amount) {
      const newBookingRequest: IBooking = {
        date: date,
        time: time,
        amount: amount,
      }
      setError(false)
      const isAvailable = getAvailability(newBookingRequest)
      isAvailable.then(function (result) {
        if (result === true) {
          setBookingForm(false)
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
      saveBooking(newBooking)
      setError(false)
      setName('')
      setEmail('')
      setPhone('')
    } else {
      setError(true)
    }
  }

  const toggleForms = () => {
    setGuestForm(false)
    setBookingForm(true)
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
                />
              </div>
              <StyledButton>Find a table</StyledButton>
              {error && (
                <div className="error-generic">
                  Please fill out missing fields.
                </div>
              )}
            </StyledForm>
          </>
        )}

        {guestForm && (
          <>
            <StyledForm onSubmit={confirmBooking}>
              <StyledMediumHeading>
                <span
                  onClick={toggleForms}
                  className="material-symbols-outlined arrow"
                >
                  arrow_back_ios
                </span>
                Guest information
              </StyledMediumHeading>
              <StyledParagraph>
                {`${date}`}
                <span className="material-symbols-outlined">
                  restaurant_menu
                </span>
                {`${time}:00 pm`}
              </StyledParagraph>

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
                  type="text"
                  onChange={(e) => setPhone(e.target.value)}
                  className={error && !phone ? 'error-input' : ''}
                  placeholder="Phone"
                  value={phone}
                />
              </div>
              <StyledButton>Confirm booking</StyledButton>
              {error && (
                <div className="error-generic">
                  All fields must be filled out.
                </div>
              )}
            </StyledForm>
          </>
        )}
      </StyledFlexDiv>

      {confirmation && (
        <StyledFlexDiv padding="50px 0px">
          <StyledSmallHeading>
            Your reservation is confirmed.
          </StyledSmallHeading>
          <StyledButton margin="40px 0px">
            <Link to="/">Back home</Link>
          </StyledButton>
        </StyledFlexDiv>
      )}
    </div>
  )
}
