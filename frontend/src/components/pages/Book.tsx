import { FormEvent, useState } from 'react'

export default function Book() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div>
      <h2>Guest information</h2>
      <form onSubmit={handleSubmit}>
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
            type="text"
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
      </form>
    </div>
  )
}
