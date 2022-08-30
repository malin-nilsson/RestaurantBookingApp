import { useState, useEffect } from 'react'
import AdminMain from '../admin-components/AdminMain'
import { StyledLoader } from '../styled-components/Loader/StyledLoader'

export default function Admin() {
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
