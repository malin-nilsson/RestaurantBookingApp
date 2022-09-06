import { FormEvent, useContext, useEffect, useState } from 'react'
import { BookingContext } from '../../context/BookingContext'
import { ICancellation } from '../../models/ICancellation'
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
import { StyledConfirmationWrapper } from '../styled-components/Wrappers/StyledConfirmationWrapper'
import { IBooking } from '../../models/IBooking'
import { IGuest } from '../../models/IGuest'
import AdminShowGuest from './AdminShowGuest'
import { GuestContext } from '../../context/GuestContext'
import { deleteGuest } from '../../services/deleteGuest'
import AddBooking from '../AddBooking'

export default function AdminMain() {
  let bookings = useContext(BookingContext)
  let guests = useContext(GuestContext)
  const [guest, setGuest] = useState<IGuest>({
    _id: '',
    name: '',
    email: '',
    phone: '',
  })
  const [searchInput, setSearchInput] = useState('')
  const [showGuest, setShowGuest] = useState(false)
  const [filteredByDate, setFilteredByDate] = useState<IBooking[]>()
  const [searchResults, setSearchResults] = useState<IBooking[]>()
  const [message, setMessage] = useState('')
  const [editForm, setEditForm] = useState(false)
  const [addForm, setAddForm] = useState(false)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [amount, setAmount] = useState(0)
  const [search, setSearch] = useState(false)
  const [dateSearchInput, setDateSearchInput] = useState('')
  const [adminBookingConfirmation, setAdminBookingConfirmation] = useState(
    false,
  )
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const [deleteGuestConfirmation, setDeleteGuestConfirmation] = useState(false)
  const [cancelledBooking, setCancelledBooking] = useState<ICancellation>()
  const [notAvailable, setNotAvailable] = useState(false)
  const [loader, setLoader] = useState<Boolean>(false)
  const [selectedBooking, setSelectedBooking] = useState<IBooking[]>()
  const [noResultsMessage, setNoResultsMessage] = useState(false)
  const [showBookings, setShowBookings] = useState(true)
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

  // Stop loader and show bookings
  const stopLoader = () => {
    setLoader(false)
    setShowBookings(true)
  }

  // Show confirmation when adding new booking as admin
  const showBookingConfirmation = () => {
    setSearch(false)
    setAdminBookingConfirmation(true)
  }

  // Clear components
  const clearPage = () => {
    setEditForm(false)
    setAddForm(false)
    setShowGuest(false)
    setDeleteGuestConfirmation(false)
    setAdminBookingConfirmation(false)
    setShowBookings(false)
    setDeleteConfirmation(false)
    setNoResultsMessage(false)
    setSearchResults([])
    setFilteredByDate([])
  }

  // Search bookings based on text input
  const searchBookings = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    clearPage()

    if (searchInput) {
      const filteredData = bookings.bookings.filter((booking) => {
        if (booking.guest === null) {
          setNoResultsMessage(true)
        } else {
          return Object.values(booking.guest.name)
            .join('')
            .toLowerCase()
            .includes(searchInput.toLowerCase())
        }
      })

      if (filteredData.length > 0) {
        clearPage()
        setSearchInput('')
        setLoader(true)
        setSearchResults(filteredData)
        setTimeout(stopLoader, 1000)
      } else {
        setNoResultsMessage(true)
      }
    }
  }

  // Search bookings based on date input
  const searchByDate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setShowBookings(true)
    clearPage()
    setSearchInput('')
    const filteredBookings: IBooking[] = bookings.bookings.filter((booking) => {
      if (booking.guest === null) {
        booking.guest = {
          name: 'Guest information has been removed per request',
          email: 'Guest information has been removed per request',
          phone: 'Guest information has been removed per request',
        }
        return booking.date === dateSearchInput
      } else {
        return booking.date === dateSearchInput
      }
    })

    if (filteredBookings.length > 0) {
      clearPage()
      setDateSearchInput('')
      setLoader(true)
      setTimeout(stopLoader, 1000)
      setSearchResults(filteredBookings)
      setShowBookings(false)
    } else {
      setFilteredByDate([])
      setNoResultsMessage(true)
    }
  }

  // Show guest form and hide everything else
  const showAddForm = () => {
    clearPage()
    setAddForm(true)
  }

  // Show edit form
  const showEditForm = (clickedBooking: IBooking) => {
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

  const showGuestAccount = (guest: IGuest) => {
    setGuest(guest)
    setShowBookings(false)
    setShowGuest(true)
  }
  // Confirm delete for booking
  const confirmDelete = (booking: IBooking) => {
    if (window.confirm('Are you sure you want to cancel this reservation?')) {
      const deletedBooking: ICancellation = {
        date: booking.date,
        time: booking.time,
        amount: booking.amount,
        name: booking.guest.name,
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

  // Confirm delete for guest account
  const confirmGuestDelete = (guest: IGuest) => {
    if (window.confirm('Are you sure you want to delete this guest account?')) {
      setShowGuest(false)
      setDeleteGuestConfirmation(true)
      deleteGuest(guest)
      guests.deleteGuest(guest)
    } else {
      return
    }
  }
  return (
    <>
      <StyledFlexDiv>
        <section>
          <StyledLinkWrapper margin="30px 0px 0px">
            <StyledAdminButton
              type="button"
              onClick={() => {
                setSearch(true)
                setAddForm(false)
                setAdminBookingConfirmation(false)
              }}
            >
              Find reservation
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
                    <StyledParagraph
                      padding="5px 0px"
                      fontSize="1.6rem"
                      textTransform="uppercase"
                    >
                      Find by name:
                    </StyledParagraph>
                  </StyledFlexDiv>
                  <div className="search-box">
                    <input
                      type="text"
                      className="search-input"
                      required={true}
                      onChange={(e) => {
                        setNoResultsMessage(false)
                        setSearchInput(e.target.value)
                      }}
                      value={searchInput}
                      placeholder="Find booking by name..."
                    />
                    <StyledButton margin="0px" padding="10px">
                      <span className="material-symbols-outlined">search</span>
                    </StyledButton>
                  </div>
                </StyledTransparentForm>

                <StyledTransparentForm border="none" onSubmit={searchByDate}>
                  <StyledFlexDiv justify="flex-start" align="flex-start">
                    <StyledParagraph
                      padding="5px 0px"
                      fontSize="1.6rem"
                      textTransform="uppercase"
                    >
                      Find by date:
                    </StyledParagraph>
                  </StyledFlexDiv>
                  <div className="search-box">
                    <input
                      type="date"
                      className="search-input"
                      required={true}
                      onChange={(e) => {
                        setNoResultsMessage(false)
                        setDateSearchInput(e.target.value)
                      }}
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
          {loader && <StyledLoader margin="60px auto"></StyledLoader>}
        </section>
      </StyledFlexDiv>

      <StyledFlexDiv>
        {addForm && (
          <AddBooking
            overflow={'unset'}
            border="1px solid var(--beige)"
            padding="0px"
            width="100%"
            background="unset"
            buttonURL="/admin/start"
            navigateURL="/admin/start"
          ></AddBooking>
        )}
        {showBookings && searchResults && (
          <AdminShowBookings
            list={searchResults}
            showEditForm={showEditForm}
            confirmDelete={confirmDelete}
            showGuestAccount={showGuestAccount}
          ></AdminShowBookings>
        )}

        {noResultsMessage && (
          <StyledParagraph fontSize="1.8rem">
            Sorry, we couldn't find any reservations for '
            {searchInput ? searchInput : dateSearchInput}'
          </StyledParagraph>
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
        {adminBookingConfirmation && (
          <StyledConfirmationWrapper width="100%">
            <AdminConfirmation
              message="The reservation has been confirmed."
              specificBooking={specificBooking}
            ></AdminConfirmation>
          </StyledConfirmationWrapper>
        )}
      </StyledFlexDiv>

      {showGuest && (
        <AdminShowGuest
          guest={guest}
          confirmGuestDelete={confirmGuestDelete}
          setShowGuest={setShowGuest}
          setShowBookings={setShowBookings}
        ></AdminShowGuest>
      )}

      {deleteConfirmation && cancelledBooking && (
        <StyledConfirmationWrapper width="100%">
          <AdminConfirmation
            cancelledBooking={cancelledBooking}
            message="The reservation has been cancelled."
          ></AdminConfirmation>
        </StyledConfirmationWrapper>
      )}

      {deleteGuestConfirmation && (
        <StyledConfirmationWrapper width="100%">
          <AdminConfirmation message="The guest account has been deleted."></AdminConfirmation>
        </StyledConfirmationWrapper>
      )}
    </>
  )
}
