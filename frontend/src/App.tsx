import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/pages/Home'
import Book from './components/pages/Book'
import Contact from './components/pages/Contact'
import { useState } from 'react'
import { BookingContext, IBookingContext } from './context/BookingsContext'
import Admin from './components/pages/Admin'
import { GuestContext, IGuestContext } from './context/GuestContext'

function App() {
  const [bookingData, setBookingData] = useState<IBookingContext>({
    bookings: [],
    updateContext: updateContext,
  })
  const [guestData, setGuestData] = useState<IGuestContext>({
    guests: [],
  })

  function updateContext(updatedContext: IBookingContext): void {
    setBookingData({ ...updatedContext })
  }

  return (
    <BookingContext.Provider value={bookingData}>
      <GuestContext.Provider value={guestData}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/book" element={<Book />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GuestContext.Provider>
    </BookingContext.Provider>
  )
}

export default App
