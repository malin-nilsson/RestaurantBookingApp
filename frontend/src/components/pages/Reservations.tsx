import AddBooking from '../AddBooking'

export default function Reservations() {
  return (
    <AddBooking
      overflow="scroll"
      border="none"
      padding="160px 0px"
      width="45%"
      background='url("assets/outdoor-patio.jpg") no-repeat fixed center / cover'
      message="You'll soon get an email along with your booking confirmation."
      buttonURL="/"
      navigateURL="/reservations"
    ></AddBooking>
  )
}
