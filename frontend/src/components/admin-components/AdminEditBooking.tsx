import { FormEvent, useContext, useState } from 'react'
// CONTEXT //
import { BookingContext } from '../../context/BookingContext'
// MODELS //
import { IBooking } from '../../models/IBooking'
// SERVICES //
import { countTables } from '../../services/countTables'
import { getAvailability } from '../../services/getAvailability'
import { limitPastDates } from '../../services/limitDate'
import { saveEditedBooking } from '../../services/saveEditedBooking'
// STYLED COMPONENTS //
import { StyledButton } from '../styled-components/Buttons/StyledButtons'
import { StyledTransparentForm } from '../styled-components/Forms/StyledTransparentForm'
import {
  StyledMediumHeading,
  StyledSmallHeading,
} from '../styled-components/Headings/StyledHeadings'
import { StyledParagraph } from '../styled-components/Text/StyledParagraph'
import { StyledHeadingWrapper } from '../styled-components/Wrappers/StyledFlex'

interface AdminEditProps {
  specificBooking: IBooking
  setEditForm(show: boolean): void
  setShowBookings(show: boolean): void
  setSpecificBooking(booking: IBooking): void
  showBookingConfirmation(): void
}

export default function AdminEditBooking(props: AdminEditProps) {
  let bookings = useContext(BookingContext)
  const [date, setDate] = useState(props.specificBooking.date)
  const [time, setTime] = useState(props.specificBooking.time)
  const [message, setMessage] = useState(props.specificBooking.message)
  const [amount, setAmount] = useState(props.specificBooking.amount)
  const [tableAmount, setTableAmount] = useState(0)
  const [notAvailable, setNotAvailable] = useState(false)
  const [error, setError] = useState(false)

  const handleEdit = (e: FormEvent<HTMLFormElement>, reservation: IBooking) => {
    e.preventDefault()

    if (date && time && amount) {
      setError(false)

      // Check how many tables are needed (6 guests/table)
      const tablesNeeded = countTables(amount) as number
      setTableAmount(tablesNeeded)

      const editedBooking: IBooking = {
        _id: reservation._id,
        date: date,
        time: time,
        amount: amount,
        tables: tablesNeeded,
        message: message,
        guest: {
          name: reservation.guest.name,
          email: reservation.guest.email,
          phone: reservation.guest.phone,
        },
      }

      props.setSpecificBooking(editedBooking)

      const isAvailable = getAvailability(editedBooking)
      isAvailable.then(function (result) {
        if (result.valueOf() === true) {
          saveEditedBooking(editedBooking)
          bookings.updateBooking(editedBooking)
          window.scrollTo(0, 0)
          props.showBookingConfirmation()
          props.setEditForm(false)
          setError(false)
        } else {
          props.setEditForm(true)
          setNotAvailable(true)
        }
      })
    } else {
      setError(true)
    }
  }

  return (
    <StyledTransparentForm
      onSubmit={(e) => handleEdit(e, props.specificBooking)}
    >
      <StyledHeadingWrapper width="100%">
        <div>
          <span
            onClick={() => {
              props.setEditForm(false)
              props.setShowBookings(true)
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
            {props.specificBooking.guest.name} – {props.specificBooking.date} –{' '}
            {props.specificBooking.time}:00 pm – Guests:{' '}
            {props.specificBooking.amount}
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
          <div className="error-generic">Please fill out required fields.</div>
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
          <option defaultValue={''}>Choose a seating</option>
          <option value="18">18:00 PM</option>
          <option value="21">21:00 PM</option>
        </select>
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

      <StyledButton>Edit reservation</StyledButton>
    </StyledTransparentForm>
  )
}
