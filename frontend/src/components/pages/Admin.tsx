import { useContext, useEffect, useState } from 'react'
import { BookingContext } from '../../context/BookingsContext'
import { IBooking } from '../../models/IBooking'
import { getBookings } from '../../services/getBookings'

export default function Admin() {
  //   const API = "https://localhost:4000/bookings";

  const context = useContext(BookingContext)
  const [bookings, setBookings] = useState<IBooking[]>([])

  //   useEffect(() => {
  //     let theBookings: IBooking[] = getBookings<IBooking>()
  //     if (theBookings.length !== =){
  //         setBookings(getBookings)
  //     }
  //   });

  //   axios.get<IBooking[]>(API).then((res) => {
  //     setBookings(res.data);
  //     context.updateContext({ ...context, bookings: res.data });
  //   });

  return (
    <>
      <h1>ADMIN PAGE</h1>
    </>
  )
}
