import { FormEvent, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookingContext } from '../../context/BookingContext'
import { IBooking } from '../../models/IBooking'
import { IBookingRequest } from '../../models/IBookingRequest'
import { IReservation } from '../../models/IReservation'
import { countTables } from '../../services/countTables'
import { getAvailability } from '../../services/getAvailability'
import { limitPastDates } from '../../services/limitDate'
import { saveBooking } from '../../services/saveBooking'
import { StyledButton } from '../styled-components/Buttons/StyledButtons'
import { StyledTransparentForm } from '../styled-components/Forms/StyledTransparentForm'
import { StyledMediumHeading } from '../styled-components/Headings/StyledHeadings'
import { StyledLoader } from '../styled-components/Loader/StyledLoader'
import { StyledParagraph } from '../styled-components/Text/StyledParagraph'
import { StyledConfirmationWrapper } from '../styled-components/Wrappers/StyledConfirmationWrapper'
import {
  StyledFlexDiv,
  StyledHeadingWrapper,
} from '../styled-components/Wrappers/StyledFlex'

interface AdminAddProps {
  setSpecificBooking(booking: IBooking): void
  showBookingConfirmation(): void
}

export default function AdminAddBooking(props: AdminAddProps) {
  let bookings = useContext(BookingContext)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [amount, setAmount] = useState(0)
  const [tableAmount, setTableAmount] = useState(0)
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
  const [specificBooking, setSpecificBooking] = useState<IBooking>({
    _id: '',
    date: '',
    time: '',
    amount: 0,
    tables: 0,
    message: '',
    guest: {
      name: '',
      email: '',
      phone: '',
    },
  })

  const showConfirmation = () => {
    setLoader(false)
    setGuestForm(false)
    props.showBookingConfirmation()
  }

  const showGuestForm = () => {
    setLoader(false)
    setGuestForm(true)
  }

  const showBookingForm = () => {
    setLoader(false)
    setBookingForm(true)
    setNotAvailable(true)
  }

  const checkAvailability = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (date && time && amount) {
      const tablesNeeded = countTables(amount) as number
      setTableAmount(tablesNeeded)

      const newBookingRequest: IBookingRequest = {
        date: date,
        time: time,
        amount: amount,
        tables: tablesNeeded,
      }
      setBookingForm(false)
      setError(false)
      setLoader(true)

      const isAvailable = getAvailability(newBookingRequest)
      isAvailable.then(function (result) {
        if (result.valueOf() === true) {
          setTimeout(showGuestForm, 1000)
        } else {
          setTimeout(showBookingForm, 1000)
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
      setTimeout(showConfirmation, 1000)

      // Check how many tables are needed (6 guests/table)
      const tablesNeeded = countTables(amount) as number
      setTableAmount(tablesNeeded)

      const newBooking: IBooking = {
        date: date,
        time: time,
        amount: +amount,
        tables: tablesNeeded,
        message: message,
        guest: {
          name: name,
          email: email,
          phone: phone,
        },
      }
      props.setSpecificBooking(newBooking)
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
    setBookingForm(true)
    setError(false)
    setGuestForm(false)
    setNotAvailable(false)
  }

  return (
    <div>
      {loader && <StyledLoader margin="0px auto"></StyledLoader>}
      <StyledFlexDiv padding="0px 10px 30px">
        {bookingForm && (
          <>
            <StyledTransparentForm onSubmit={checkAvailability} padding="20px">
              <StyledFlexDiv>
                <StyledMediumHeading fontSize="2rem" margin="0px 0px 10px">
                  Create New Reservation
                </StyledMediumHeading>
              </StyledFlexDiv>
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
                  <option defaultValue={''}>Choose a seating</option>
                  <option value="18">18:00 PM</option>
                  <option value="21">21:00 PM</option>
                </select>
              </div>

              <div className="form-field">
                <label>Number of Guests *</label>
                <div className="guest-amount-wrapper">
                  <input
                    type="number"
                    min={1}
                    max={90}
                    onChange={(e) => setAmount(+e.target.value)}
                    className={error && !amount ? 'error-input' : ''}
                    value={amount}
                  />
                  <div className="guest-amount-btns">
                    <button
                      type="button"
                      disabled={amount < 1}
                      onClick={() => setAmount(amount - 1)}
                      className="material-symbols-outlined"
                    >
                      remove
                    </button>
                    <button
                      type="button"
                      disabled={amount > 89}
                      onClick={() => setAmount(amount + 1)}
                      className="material-symbols-outlined"
                    >
                      add
                    </button>
                  </div>
                </div>
              </div>

              <StyledButton>Find a table</StyledButton>
            </StyledTransparentForm>
          </>
        )}

        {guestForm && (
          <>
            <StyledTransparentForm margin="30px 0px" onSubmit={confirmBooking}>
              <StyledHeadingWrapper margin="0px 0px 15px" width="100%">
                <div>
                  <span
                    onClick={() => {
                      toggleForms()
                    }}
                    className="material-symbols-outlined arrow"
                  >
                    arrow_back_ios
                  </span>
                </div>

                <div>
                  <StyledMediumHeading fontSize="2rem" margin="0px">
                    Guest information
                  </StyledMediumHeading>
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
                  Please fill out required fields.
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
              <StyledButton>Confirm booking</StyledButton>
            </StyledTransparentForm>
          </>
        )}
      </StyledFlexDiv>
    </div>
  )
}
