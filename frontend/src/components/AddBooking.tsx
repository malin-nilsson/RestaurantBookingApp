import { FormEvent, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookingContext } from '../context/BookingContext'
import { IBookingRequest } from '../models/IBookingRequest'
import { countTables } from '../services/countTables'
import { getAvailability } from '../services/getAvailability'
import { saveBooking } from '../services/saveBooking'
import { StyledLoader } from './styled-components/Loader/StyledLoader'
import { StyledFlexDiv } from './styled-components/Wrappers/StyledFlex'
import { StyledHeroForm } from './styled-components/Hero/StyledHeroForm'
import { IBooking } from '../models/IBooking'
import { IGuest } from '../models/IGuest'
import BookingConfirmation from './BookingConfirmation'
import BookingForm from './BookingForm'
import GuestRegistrationForm from './GuestRegistrationForm'

interface IAddBookingProps {
  overflow: string
  border: string
  padding: string
  width: string
  background?: string
  message?: string | undefined
  buttonURL: string
  navigateURL: string
}

export default function AddBooking(props: IAddBookingProps) {
  let bookings = useContext(BookingContext)
  const navigate = useNavigate()
  const [tableAmount, setTableAmount] = useState(0)
  const [requestedDate, setRequestedDate] = useState('')
  const [requestedTime, setRequestedTime] = useState('')
  const [requestedAmount, setRequestedAmount] = useState(0)
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

  // Show booking confirmation and stop loader
  const showConfirmation = () => {
    window.scrollTo(0, 0)
    setLoader(false)
    setGuestForm(false)
    setConfirmation(true)
  }

  // Show guest details form and stop loader
  const showGuestForm = () => {
    setLoader(false)
    setBookingForm(false)
    setGuestForm(true)
  }

  // Show booking form and stop loader
  const showBookingForm = () => {
    setLoader(false)
    setBookingForm(true)
    setNotAvailable(true)
  }

  // Check restaurant's availability
  const checkAvailability = async (
    e: FormEvent<HTMLFormElement>,
    requestDate: string,
    requestTime: string,
    requestAmount: number,
  ) => {
    e.preventDefault()

    setRequestedDate(requestDate)
    setRequestedTime(requestTime)
    setRequestedAmount(requestAmount)

    // Check how many tables are needed (6 guests/table)
    const tablesNeeded = countTables(requestAmount) as number
    setTableAmount(tablesNeeded)

    // Create a request
    const newBookingRequest: IBookingRequest = {
      date: requestDate,
      time: requestTime,
      amount: requestAmount,
      tables: tablesNeeded,
    }

    // Hide form and show loader
    setBookingForm(false)
    setLoader(true)
    setError(false)

    // Get availability
    const isAvailable = getAvailability(newBookingRequest)
    isAvailable.then(function (result) {
      if (result.valueOf() === true) {
        window.scrollTo(0, 0)
        setTimeout(showGuestForm, 1000)
      } else {
        setTimeout(showBookingForm, 1000)
      }
    })
  }

  // Confirm if table is available
  const confirmBooking = (
    e: FormEvent<HTMLFormElement>,
    guestName: string,
    guestEmail: string,
    guestPhone: string,
    guestMessage: string,
  ) => {
    e.preventDefault()

    // Hide form and show loader
    setGuestForm(false)
    setLoader(true)
    setTimeout(showConfirmation, 1000)

    // Check how many tables are needed
    const tablesNeeded = countTables(requestedAmount) as number
    setTableAmount(tablesNeeded)

    const guest: IGuest = {
      name: guestName,
      email: guestEmail,
      phone: guestPhone,
    }

    const newBooking: IBooking = {
      date: requestedDate,
      time: requestedTime,
      amount: +requestedAmount,
      tables: tablesNeeded,
      message: guestMessage,
      guest: guest,
    }

    setSpecificBooking(newBooking)
    // Save booking to db
    saveBooking(newBooking)
    // Update context
    bookings.addBooking(newBooking)

    // Clears errors and inputs
    setError(false)
    navigate(props.navigateURL)
  }

  // Toggle between booking form and guest form
  const toggleForms = () => {
    window.scrollTo(0, 0)
    setGuestForm(false)
    setError(false)
    setBookingForm(true)
    setNotAvailable(false)
  }

  return (
    <StyledHeroForm overflow={props.overflow} background={props.background}>
      <StyledFlexDiv>
        {loader && <StyledLoader></StyledLoader>}
        {bookingForm && (
          <BookingForm
            checkAvailability={checkAvailability}
            border={props.border}
            notAvailable={notAvailable}
            error={error}
          ></BookingForm>
        )}

        {guestForm && (
          <GuestRegistrationForm
            confirmBooking={confirmBooking}
            toggleForms={toggleForms}
            border={props.border}
            notAvailable={notAvailable}
            error={error}
            requestedDate={requestedDate}
            requestedTime={requestedTime}
            requestedAmount={requestedAmount}
          ></GuestRegistrationForm>
        )}
      </StyledFlexDiv>

      {confirmation && (
        <BookingConfirmation
          padding={props.padding}
          width={props.width}
          specificBooking={specificBooking}
          message={props.message}
          url={props.buttonURL}
        ></BookingConfirmation>
      )}
    </StyledHeroForm>
  )
}
