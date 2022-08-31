import axios from 'axios'
import { useState, useEffect } from 'react'
import { BookingInterface, defaultValue } from '../../context/BookingContext'
import { GuestInterface } from '../../context/GuestContext'
import { IGuest } from '../../models/IGuest'
import AdminMain from '../admin-components/AdminMain'
import { StyledLoader } from '../styled-components/Loader/StyledLoader'

export default function Admin() {
  const [guests, setGuests] = useState<GuestInterface>(defaultValue)
  const [loading, setLoading] = useState<Boolean>(true)

  // Loader
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  }, [loading])

  return (
    <>{loading ? <StyledLoader> </StyledLoader> : <AdminMain></AdminMain>}</>
  )
}
