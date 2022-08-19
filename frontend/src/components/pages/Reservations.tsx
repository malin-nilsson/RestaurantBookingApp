import { FormEvent, useState } from 'react'
// REACT ROUTER //
import { Link } from 'react-router-dom'
// SERVICES //
import { saveGuest } from '../../services/saveGuest'
import { limitPastDates } from '../../services/limitDate'
// MODELS//
import { IGuest } from '../../models/IGuest'
// STYLED COMPONENTS //
import { StyledForm } from '../styled-components/Form/StyledForm'
import { StyledFlexDiv } from '../styled-components/Wrappers/StyledFlex'
import {
  StyledMediumHeading,
  StyledSmallHeading,
} from '../styled-components/Headings/Headings'
import { StyledButton } from '../styled-components/Button/StyledButton'

export default function Book() {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [amount, setAmount] = useState(0)
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState(false)
  const [guestForm, setGuestForm] = useState(false)
  const [bookingForm, setBookingForm] = useState(true)
  const [confirmation, setConfirmation] = useState(false)

  const checkAvailability = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (date || time || amount) {
      const newBookingRequest = {
        date: date,
        time: time,
        amount: amount,
      }
      setError(false)
      setDate('')
      setTime('')
      setAmount(0)
      setBookingForm(false)
      setGuestForm(true)
      console.log(newBookingRequest)
    } else {
      setError(true)
    }
  }

  const saveNewGuest = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (name || email || phone) {
      const newGuest: IGuest = {
        name: name,
        email: email,
        phone: phone,
      }
      saveGuest(newGuest)
      setError(false)
      setName('')
      setEmail('')
      setPhone('')
      setConfirmation(true)
      setGuestForm(false)
    } else {
      setError(true)
    }
  }

  return (
    <div>
      <StyledFlexDiv>
        {bookingForm && (
          <>
            <StyledMediumHeading>Make a Reservation</StyledMediumHeading>
            <StyledForm onSubmit={checkAvailability}>
              <div className="form-field">
                <label>Date *</label>
                <input
                  type="date"
                  min={limitPastDates()}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Date"
                  value={date}
                />
              </div>

              <div className="form-field">
                <label>Time *</label>
                <select
                  onChange={(e) => setTime(e.target.value)}
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
                  onChange={(e) => setAmount(+e.target.value)}
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
                <div className="error">Please fill out missing fields.</div>
              )}
            </StyledForm>
          </>
        )}

        {guestForm && (
          <>
            <StyledMediumHeading>Guest information</StyledMediumHeading>
            <StyledForm onSubmit={saveNewGuest}>
              <div className="form-field">
                <label>Name *</label>
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  value={name}
                />
              </div>

              <div className="form-field">
                <label>Email *</label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  value={email}
                />
              </div>

              <div className="form-field">
                <label>Phone *</label>
                <input
                  type="text"
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone"
                  value={phone}
                />
              </div>
              <StyledButton>Confirm booking</StyledButton>
              {error && (
                <div className="error">All fields must be filled out.</div>
              )}
            </StyledForm>
          </>
        )}
      </StyledFlexDiv>

      {confirmation && (
        <StyledFlexDiv padding="50px 0px">
          <StyledSmallHeading>Thank you.</StyledSmallHeading>
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
