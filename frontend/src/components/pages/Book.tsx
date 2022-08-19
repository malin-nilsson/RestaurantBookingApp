import { networkInterfaces } from 'os'
import { stringify } from 'querystring'
import { useState } from 'react'
import { IBooking } from '../../models/IBooking'
import { IGuest } from '../../models/IGuest'
import axios from 'axios'
import { saveBooking } from '../../services/saveBooking'
import { limitPastDates } from '../../services/limitDate'
import React from 'react'
// import { checkAvailability } from "../../services/checkAvailability";

export const Book = () => {
  // const [available, setAvailable] = useState<IBooking>({
  //   id: "",
  //   date: "",
  //   time: "",
  //   amount: 0,
  // });

  // const checkAvailability = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   axios.get("https://localhost:4000/bookings").then((response) => {
  //     setAvailable(response.data);
  //     console.log(available);
  //   });
  // };

  return (
    <div>
      {/* <form onSubmit={() => checkAvailability(e)}>
        <input type="date" min={limitPastDates()} />
        <select name="time">
          <option value="time1">18</option>
          <option value="time2">21</option>
        </select>
        <input type="" min="1" max="6" />
        <input type="submit" value="Sök bord" />
      </form> */}
    </div>
  )
}
