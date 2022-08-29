import { FormEvent, useContext, useState } from 'react'
import { BookingContext } from '../../context/BookingContext'
import { ICancellation } from '../../models/ICancellation'
import { IReservation } from '../../models/IReservation'
import { deleteBooking } from '../../services/deleteBooking'
import {
  StyledAdminButton,
  StyledButton,
} from '../styled-components/Buttons/StyledButtons'
import { StyledTransparentForm } from '../styled-components/Forms/StyledTransparentForm'
import { StyledLoader } from '../styled-components/Loader/StyledLoader'
import { StyledParagraph } from '../styled-components/Text/StyledParagraph'
import { StyledFlexDiv } from '../styled-components/Wrappers/StyledFlex'
import { StyledLinkWrapper } from '../styled-components/Wrappers/StyledLinkWrapper'
import AdminShowBookings from './AdminShowBookings'
import AdminEditBooking from './AdminEditBooking'
import AdminConfirmation from './AdminConfirmation'
import AdminAddBooking from './AdminAddBooking'
import { StyledConfirmationWrapper } from '../styled-components/Wrappers/StyledConfirmationWrapper'

export default function AdminMain() {
  let bookings = useContext(BookingContext)
  const [searchInput, setSearchInput] = useState('')
  const [filteredBookings, setFilteredBookings] = useState<IReservation[]>()
  const [message, setMessage] = useState('')
  const [editForm, setEditForm] = useState(false)
  const [addForm, setAddForm] = useState(false)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [amount, setAmount] = useState(0)
  const [search, setSearch] = useState(false)
  const [dateSearchInput, setDateSearchInput] = useState('')
  const [bookingConfirmation, setBookingConfirmation] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const [cancelledBooking, setCancelledBooking] = useState<ICancellation>()
  const [notAvailable, setNotAvailable] = useState(false)
  const [loader, setLoader] = useState<Boolean>(false)
  const [selectedBooking, setSelectedBooking] = useState<IReservation[]>()
  const [noResultsMessage, setNoResultsMessage] = useState('')
  const [showBookings, setShowBookings] = useState(true)
  const [specificBooking, setSpecificBooking] = useState<IReservation>({
    _id: '',
    date: '',
    time: '',
    amount: 0,
    tables: 0,
    message: '',
    guestName: '',
    guestEmail: '',
    guestPhone: '',
  })

  const stopLoader = () => {
    setLoader(false)
    setShowBookings(true)
  }

  const showBookingConfirmation = () => {
    setSearch(false)
    setBookingConfirmation(true)
  }

  const searchBookings = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setEditForm(false)
    setAddForm(false)
    setBookingConfirmation(false)
    setShowBookings(true)
    setDeleteConfirmation(false)
    searchInput.trim()
    setSearchInput('')

    const filteredBookings: IReservation[] = bookings.bookings.filter(
      (booking) =>
        Object.values(booking.guestName)
          .join('')
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        Object.values(booking.guestEmail)
          .join('')
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        booking._id === searchInput,
    )

    if (filteredBookings.length > 0) {
      setNoResultsMessage('')
      setLoader(true)
      setTimeout(stopLoader, 1000)
      setFilteredBookings(filteredBookings)
      setShowBookings(false)
    } else {
      setFilteredBookings([])
      setNoResultsMessage("Sorry, we couldn't find any reservations.")
    }
  }

  const searchByDate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setEditForm(false)
    setBookingConfirmation(false)
    setShowBookings(true)
    setDeleteConfirmation(false)

    const filteredBookings: IReservation[] = bookings.bookings.filter(
      (booking) => booking.date === dateSearchInput,
    )
    if (filteredBookings.length > 0) {
      setNoResultsMessage('')
      setLoader(true)
      setTimeout(stopLoader, 1000)
      setFilteredBookings(filteredBookings)
      setShowBookings(false)
    } else {
      setFilteredBookings([])
      setNoResultsMessage("Sorry, we couldn't find any reservations.")
    }
  }

  const showAddForm = () => {
    setSearch(false)
    setAddForm(true)
    setDeleteConfirmation(false)
    setBookingConfirmation(false)
    setEditForm(false)
    setShowBookings(false)
    setNoResultsMessage('')
  }

  const showEditForm = (clickedBooking: IReservation) => {
    setShowBookings(false)
    setEditForm(true)
    setSpecificBooking(clickedBooking)
    const bookingToEdit = bookings.bookings.filter(
      (booking) => booking._id === clickedBooking._id,
    )
    setSelectedBooking(bookingToEdit)
    setNotAvailable(false)
    setDate('')
    setTime('')
    setAmount(0)
    setMessage('')
  }

  const confirmDelete = (booking: IReservation) => {
    if (window.confirm('Are you sure you want to cancel this reservation?')) {
      const deletedBooking: ICancellation = {
        date: booking.date,
        time: booking.time,
        amount: booking.amount,
        name: booking.guestName,
      }
      setShowBookings(false)
      setDeleteConfirmation(true)
      deleteBooking(booking)
      bookings.deleteBooking(booking)
      setCancelledBooking(deletedBooking)
    } else {
      return
    }
  }

  return (
    <>
      <StyledFlexDiv>
        <section>
          <StyledLinkWrapper>
            <StyledAdminButton
              type="button"
              onClick={() => {
                setSearch(true)
                setAddForm(false)
                setBookingConfirmation(false)
              }}
            >
              Search reservations
            </StyledAdminButton>
            <StyledAdminButton
              type="button"
              onClick={() => {
                showAddForm()
              }}
              padding="20px 15px"
              fontSize="1.6rem"
            >
              Add new reservation
            </StyledAdminButton>
          </StyledLinkWrapper>

          {search && (
            <StyledFlexDiv>
              <div className="search-forms">
                <StyledTransparentForm border="none" onSubmit={searchBookings}>
                  <StyledFlexDiv justify="flex-start" align="flex-start">
                    <StyledParagraph padding="5px 0px" fontSize="1.6rem">
                      Search by name, email or booking ID:
                    </StyledParagraph>
                  </StyledFlexDiv>
                  <div className="search-box">
                    <input
                      type="text"
                      className="search-input"
                      required={true}
                      onChange={(e) => setSearchInput(e.target.value)}
                      value={searchInput}
                      placeholder="Search by name, email or booking ID..."
                    />
                    <StyledButton margin="0px" padding="10px">
                      <span className="material-symbols-outlined">search</span>
                    </StyledButton>
                  </div>
                </StyledTransparentForm>

                <StyledTransparentForm border="none" onSubmit={searchByDate}>
                  <StyledFlexDiv justify="flex-start" align="flex-start">
                    <StyledParagraph padding="5px 0px" fontSize="1.6rem">
                      Search by date:
                    </StyledParagraph>
                  </StyledFlexDiv>
                  <div className="search-box">
                    <input
                      type="date"
                      className="search-input"
                      required={true}
                      onChange={(e) => setDateSearchInput(e.target.value)}
                      value={dateSearchInput}
                    />
                    <StyledButton margin="0px" padding="10px">
                      <span className="material-symbols-outlined">search</span>
                    </StyledButton>
                  </div>
                </StyledTransparentForm>
              </div>
            </StyledFlexDiv>
          )}
        </section>
      </StyledFlexDiv>

      <StyledFlexDiv>
        <section>
          {loader && <StyledLoader margin="0px auto"></StyledLoader>}
        </section>
      </StyledFlexDiv>

      <StyledFlexDiv>
        <StyledParagraph padding="0px">{noResultsMessage}</StyledParagraph>
        {addForm && <AdminAddBooking></AdminAddBooking>}
        {showBookings && filteredBookings && (
          <AdminShowBookings
            reservations={filteredBookings}
            showEditForm={showEditForm}
            confirmDelete={confirmDelete}
          ></AdminShowBookings>
        )}
      </StyledFlexDiv>

      <StyledFlexDiv>
        {editForm && specificBooking && (
          <AdminEditBooking
            specificBooking={specificBooking}
            setEditForm={setEditForm}
            setShowBookings={setShowBookings}
            setSpecificBooking={setSpecificBooking}
            showBookingConfirmation={showBookingConfirmation}
          ></AdminEditBooking>
        )}
        {bookingConfirmation && (
          <AdminConfirmation
            message="The has been reservation confirmed."
            specificBooking={specificBooking}
          ></AdminConfirmation>
        )}
      </StyledFlexDiv>
      {deleteConfirmation && cancelledBooking && (
        <StyledConfirmationWrapper width="100%">
          <AdminConfirmation
            cancelledBooking={cancelledBooking}
            message="The reservation has been cancelled."
          ></AdminConfirmation>
        </StyledConfirmationWrapper>
      )}
    </>
  )
}
