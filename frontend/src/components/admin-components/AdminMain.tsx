import { FormEvent, useContext, useEffect, useState } from "react";
import { BookingContext } from "../../context/BookingContext";
import { ICancellation } from "../../models/ICancellation";
import { IReservation } from "../../models/IReservation";
import { deleteBooking } from "../../services/deleteBooking";
import {
  StyledAdminButton,
  StyledButton,
} from "../styled-components/Buttons/StyledButtons";
import { StyledTransparentForm } from "../styled-components/Forms/StyledTransparentForm";
import { StyledLoader } from "../styled-components/Loader/StyledLoader";
import { StyledParagraph } from "../styled-components/Text/StyledParagraph";
import { StyledFlexDiv } from "../styled-components/Wrappers/StyledFlex";
import { StyledLinkWrapper } from "../styled-components/Wrappers/StyledLinkWrapper";
import AdminShowBookings from "./AdminShowBookings";
import AdminEditBooking from "./AdminEditBooking";
import AdminConfirmation from "./AdminConfirmation";
import AdminAddBooking from "./AdminAddBooking";
import { StyledConfirmationWrapper } from "../styled-components/Wrappers/StyledConfirmationWrapper";
import { IBooking } from "../../models/IBooking";
import { IGuest } from "../../models/IGuest";
import { GuestContext } from "../../context/GuestContext";
import axios from "axios";
import { getBookingsFromGuest } from "../../services/getBookingsFromGuest";

export default function AdminMain() {
  let bookings = useContext(BookingContext);
  const [guests, setGuests] = useState<IGuest[] | undefined>();
  const [guest, setGuest] = useState<IGuest>({
    _id: "",
    name: "",
    email: "",
    phone: "",
  });
  const [searchInput, setSearchInput] = useState("");
  const [filteredGuest, setFilteredGuest] = useState<IGuest>();
  const [filteredByGuest, setFilteredByGuest] = useState<IBooking[]>();
  const [filteredByDate, setFilteredByDate] = useState<IBooking[]>();
  const [bookingsByGuest, setBookingsByGuest] = useState<IBooking[]>();
  const [message, setMessage] = useState("");
  const [editForm, setEditForm] = useState(false);
  const [addForm, setAddForm] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [amount, setAmount] = useState(0);
  const [search, setSearch] = useState(false);
  const [dateSearchInput, setDateSearchInput] = useState("");
  const [bookingConfirmation, setBookingConfirmation] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [cancelledBooking, setCancelledBooking] = useState<ICancellation>();
  const [notAvailable, setNotAvailable] = useState(false);
  const [loader, setLoader] = useState<Boolean>(false);
  const [selectedBooking, setSelectedBooking] = useState<IBooking[]>();
  const [noResultsMessage, setNoResultsMessage] = useState("");
  const [showBookings, setShowBookings] = useState(true);
  const [specificBooking, setSpecificBooking] = useState<IBooking>({
    _id: "",
    date: "",
    time: "",
    amount: 0,
    tables: 0,
    message: "",
    guest: {
      name: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    axios.get<IGuest[]>("http://localhost:4000/guests").then((response) => {
      setGuests(response.data);
    });
  }, []);

  const stopLoader = () => {
    setLoader(false);
    setShowBookings(true);
  };

  const showBookingConfirmation = () => {
    setSearch(false);
    setBookingConfirmation(true);
  };

  const searchBookings = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEditForm(false);
    setAddForm(false);
    setBookingConfirmation(false);
    setShowBookings(false);
    setDeleteConfirmation(false);
    setDateSearchInput("");
    searchInput.trim();

    if (guests && searchInput) {
      for (let i = 0; i < guests.length; i++) {
        if (guests[i].email === searchInput) {
          setGuest(guests[i]);
          const requestedGuest: IGuest = {
            name: guests[i].name,
            email: guests[i].email,
            phone: guests[i].phone,
          };
          const bookingsFromGuest = getBookingsFromGuest(requestedGuest);

          bookingsFromGuest.then(function (result: IBooking[] | []) {
            if (result.length > 0) {
              console.log(result);
              setNoResultsMessage("");
              setLoader(true);
              setTimeout(stopLoader, 1000);
              setFilteredByGuest(result);
              setShowBookings(false);
              setSearchInput("");
              setFilteredByDate([]);
            }
          });
        } else {
          setFilteredByGuest([]);
          setNoResultsMessage(
            "Sorry, we couldn't find any reservations with that e-mail."
          );
        }
      }
    }
  };

  const searchByDate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFilteredByGuest([]);
    setEditForm(false);
    setBookingConfirmation(false);
    setShowBookings(true);
    setDeleteConfirmation(false);
    setSearchInput("");

    const filteredBookings: IBooking[] = bookings.bookings.filter(
      (booking) => booking.date === dateSearchInput
    );
    if (filteredBookings.length > 0) {
      setNoResultsMessage("");
      setLoader(true);
      setTimeout(stopLoader, 1000);
      setFilteredByDate(filteredBookings);
      setShowBookings(false);
    } else {
      setFilteredByDate([]);
      setNoResultsMessage("Sorry, we couldn't find any reservations.");
    }
  };

  const showAddForm = () => {
    setAddForm(true);
    setBookingConfirmation(false);
    setSearch(false);
    setDeleteConfirmation(false);
    setEditForm(false);
    setShowBookings(false);
    setNoResultsMessage("");
  };

  const showEditForm = (clickedBooking: IBooking) => {
    setShowBookings(false);
    setEditForm(true);
    setSpecificBooking(clickedBooking);
    const bookingToEdit = bookings.bookings.filter(
      (booking) => booking._id === clickedBooking._id
    );
    setSelectedBooking(bookingToEdit);
    setNotAvailable(false);
    setDate("");
    setTime("");
    setAmount(0);
    setMessage("");
  };

  const confirmDelete = (booking: IBooking) => {
    if (window.confirm("Are you sure you want to cancel this reservation?")) {
      const deletedBooking: ICancellation = {
        date: booking.date,
        time: booking.time,
        amount: booking.amount,
        name: booking.guest.name,
      };
      setShowBookings(false);
      setDeleteConfirmation(true);
      deleteBooking(booking);
      bookings.deleteBooking(booking);
      setCancelledBooking(deletedBooking);
    } else {
      return;
    }
  };

  return (
    <>
      <StyledFlexDiv>
        <section>
          <StyledLinkWrapper>
            <StyledAdminButton
              type="button"
              onClick={() => {
                setSearch(true);
                setAddForm(false);
                setBookingConfirmation(false);
              }}
            >
              Search reservations
            </StyledAdminButton>
            <StyledAdminButton
              type="button"
              onClick={() => {
                showAddForm();
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
                      Search booking by email:
                    </StyledParagraph>
                  </StyledFlexDiv>
                  <div className="search-box">
                    <input
                      type="text"
                      className="search-input"
                      required={true}
                      onChange={(e) => setSearchInput(e.target.value)}
                      value={searchInput}
                      placeholder="Search booking by e-mail..."
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
        {addForm && (
          <AdminAddBooking
            setSpecificBooking={setSpecificBooking}
            showBookingConfirmation={showBookingConfirmation}
          ></AdminAddBooking>
        )}
        {showBookings && filteredByGuest && (
          <AdminShowBookings
            filteredByGuest={filteredByGuest}
            guest={guest}
            showEditForm={showEditForm}
            confirmDelete={confirmDelete}
          ></AdminShowBookings>
        )}
        {showBookings && filteredByDate && (
          <AdminShowBookings
            filteredByDate={filteredByDate}
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
            message="The reservation has been confirmed."
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
  );
}
