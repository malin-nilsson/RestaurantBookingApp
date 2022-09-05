import { StringIterator } from 'cypress/types/lodash'
import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { StyledButton } from './styled-components/Buttons/StyledButtons'
import { StyledGreenForm } from './styled-components/Forms/StyledGreenForm'
import { StyledMediumHeading } from './styled-components/Headings/StyledHeadings'
import { StyledParagraph } from './styled-components/Text/StyledParagraph'
import { StyledHeadingWrapper } from './styled-components/Wrappers/StyledFlex'

interface IGuestFormProps {
  confirmBooking(
    e: FormEvent<HTMLFormElement>,
    name: string,
    email: string,
    phone: string,
    message: string,
  ): void
  toggleForms(): void
  border: string
  notAvailable: boolean
  error: boolean
  requestedDate: string
  requestedTime: string
  requestedAmount: number
}

export default function GuestRegistrationForm(props: IGuestFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (name && email && phone) {
      setError(false)
      props.confirmBooking(e, name, email, phone, message)
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
          <StyledHeadingWrapper width="100%">
            <div>
              <span
                onClick={props.toggleForms}
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
            {`${props.requestedDate}`}
            <span className="material-symbols-outlined">restaurant_menu</span>
            {`${props.requestedTime}:00 pm`}
          </StyledParagraph>
          <StyledParagraph fontSize="1.6rem" padding="0px 0px 15px">
            {props.requestedAmount === 1
              ? props.requestedAmount + ' guest'
              : props.requestedAmount + ' guests'}
          </StyledParagraph>
          {props.error && (
            <div className="error-generic">
              Please fill out required fields.
            </div>
          )}
          <div className="form-field">
            <label>Name *</label>
            <div className="input-container">
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                className={error && !name ? 'error-input' : ''}
                value={name}
              />
              <span className="material-symbols-outlined">person</span>
            </div>
          </div>

          <div className="form-field">
            <label>Email *</label>
            <div className="input-container">
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className={error && !email ? 'error-input' : ''}
                value={email}
              />
              <span className="material-symbols-outlined">mail</span>
            </div>
          </div>

          <div className="form-field">
            <label>Phone *</label>
            <div className="input-container">
              <input
                type="tel"
                onChange={(e) => setPhone(e.target.value)}
                className={error && !phone ? 'error-input' : ''}
                value={phone}
              />
              <span className="material-symbols-outlined">call</span>
            </div>
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
        </StyledGreenForm>
      </section>
    </>
  )
}
