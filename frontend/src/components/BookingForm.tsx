import React, { FormEvent, useState } from 'react'
// SERVICES //
import { limitPastDates } from '../services/limitDate'
// STYLED COMPONENTS //
import { StyledButton } from './styled-components/Buttons/StyledButtons'
import { StyledGreenForm } from './styled-components/Forms/StyledGreenForm'
import { StyledMediumHeading } from './styled-components/Headings/StyledHeadings'
import { StyledParagraph } from './styled-components/Text/StyledParagraph'
import { StyledFlexDiv } from './styled-components/Wrappers/StyledFlex'

interface IBookingFormProps {
  checkAvailability(
    e: FormEvent<HTMLFormElement>,
    date: string,
    time: string,
    amount: number,
  ): void
  border: string
  notAvailable: boolean
  error: boolean
}

export default function BookingForm(props: IBookingFormProps) {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [amount, setAmount] = useState(0)
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (date && time && amount) {
      setError(false)
      props.checkAvailability(e, date, time, amount)
    } else {
      setError(true)
    }
  }

  return (
    <>
      <section className="create-booking-wrapper">
        <StyledGreenForm
          bgColor="var(--green)"
          border={props.border}
          onSubmit={(e) => handleSubmit(e)}
        >
          <StyledFlexDiv justify="center">
            <StyledMediumHeading padding="0px 0px 10px">
              Make a Reservation
            </StyledMediumHeading>
          </StyledFlexDiv>
          <div className="form-field">
            {props.notAvailable && (
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
          </div>
          <div className="form-field">
            <label>Date *</label>
            <input
              type="date"
              min={limitPastDates()}
              onChange={(e) => setDate(e.target.value)}
              className={error && !date ? 'error-input' : ''}
              value={date}
            />

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
                  className="material-symbols-outlined decrease"
                >
                  remove
                </button>
                <button
                  type="button"
                  disabled={amount > 89}
                  onClick={() => setAmount(amount + 1)}
                  className="material-symbols-outlined increase"
                >
                  add
                </button>
              </div>
            </div>
          </div>
          <StyledButton id="request-booking">Find a table</StyledButton>
        </StyledGreenForm>
      </section>
    </>
  )
}
