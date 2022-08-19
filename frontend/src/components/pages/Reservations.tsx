import { FormEvent, useState } from 'react'
import { saveGuest } from '../../services/saveGuest'
import { IGuest } from '../../models/IGuest'

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
      <h2>Guest information</h2>
      {form && (
        <form onSubmit={saveNewGuest}>
          <div></div>
          <label>Name</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            value={name}
          />

          <div>
            <label>Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              value={email}
            />
          </div>

          <div>
            <label>Phone</label>
            <input
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              value={phone}
            />
          </div>

          <button>Confirm</button>

          {error && <div>All fields must be filled out.</div>}
        </form>
      )}

      {confirmation && (
        <div>
          <h3> Your reservation is confirmed.</h3>
        </div>
      )}
    </div>
  )
}
