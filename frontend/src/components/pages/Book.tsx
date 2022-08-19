import { networkInterfaces } from "os";
import { stringify } from "querystring";
import { useState } from "react";
import { IBooking } from "../../models/IBooking";
import { IGuest } from "../../models/IGuest";
import axios from "axios";
import { saveBooking } from "../../services/saveBooking";
import { limitPastDates } from "../../services/limitDate";
// import { checkAvailability } from "../../services/checkAvailability";

export const Book = () => {
  const [booking, setBooking] = useState<IBooking>({
    id: "",
    date: "",
    time: "",
    guest: { name: "", email: "", phone: 0 },
    amount: 0,
  });

  const [available, setAvailable] = useState<IBooking>({
    id: "",
    date: "",
    time: "",
    amount: 0,
  });

  // const checkAvailability = () => {
  //   axios.get("https://localhost:4000/bookings").then((response) => {
  //     setAvailable(response.data);
  //     console.log("hej");
  //   });
  // };

  const checkAvailability = () => {
    axios.get("https://localhost:4000/bookings").then((response) => {
      setAvailable(response.data);
      console.log(available);
    });
  };

  return (
    <>
      <button onClick={checkAvailability}>click me</button>
      {/* <form onSubmit={() => checkAvailability()}> */}
      <input type="date" min={limitPastDates()} />
      <select name="time">
        <option value="time1">18</option>
        <option value="time2">21</option>
      </select>
      <input type="" min="1" max="6" />
      <input type="submit" value="Sök bord" />
      {/* </form> */}
    </>
  );
};
