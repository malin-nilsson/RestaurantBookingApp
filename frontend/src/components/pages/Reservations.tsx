import AddBooking from '../AddBooking'

export default function Reservations() {
  return (
    <AddBooking
      overflow="scroll"
      border="none"
      padding="130px 0px"
      width="45%"
      background='url("assets/outdoor-patio.jpg") no-repeat fixed center / cover'
      message="We look forward to seeing you soon."
      buttonURL="/"
      navigateURL="/reservations"
    ></AddBooking>
  )
}
