import { FormEvent, useState } from 'react'
import { saveGuest } from '../../services/saveGuest'
import { IGuest } from '../../models/IGuest'
import { StyledForm } from '../styled-components/Form/StyledForm'
import { StyledFlexDiv } from '../styled-components/Wrappers/StyledFlex'
import { StyledMediumHeading } from '../styled-components/Headings/Headings'
import { StyledButton } from '../styled-components/Button/StyledButton'

export default function Book() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState(false)
  const [form, setForm] = useState(true)
  const [confirmation, setConfirmation] = useState(false)

  const saveNewGuest = async (e: FormEvent<HTMLFormElement>) => {
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
      setForm(false)
    } else {
      setError(true)
    }
  }

  return (
    <div>
      <StyledFlexDiv>
        <StyledMediumHeading>Guest information</StyledMediumHeading>
        {form && (
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

            {error && <div>All fields must be filled out.</div>}
          </StyledForm>
        )}
      </StyledFlexDiv>

      {confirmation && (
        <div>
          <h3> Your reservation is confirmed.</h3>
        </div>
      )}
    </div>
  )
}
