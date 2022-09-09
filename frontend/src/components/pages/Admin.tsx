import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
// AXIOS //
import axios from "axios";
// CONTEXT //
import {
  defaultValue,
  GuestContext,
  GuestInterface,
} from "../../context/GuestContext";
// MODELS //
import { IGuest } from "../../models/IGuest";
// COMPONENTS //
import { StyledLoader } from "../styled-components/Loader/StyledLoader";
// STYLED COMPONENTS
import AdminMain from "../admin-components/AdminMain";

export default function Admin() {
  const [guests, setGuests] = useState<GuestInterface>(defaultValue);
  const [loading, setLoading] = useState<Boolean>(true);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);

  // Get all guests and save them in guest context
  useEffect(() => {
    axios.get<IGuest[]>("http://localhost:4000/guests").then((response) => {
      setGuests({ ...guests, guests: response.data });
    });
  }, [guests.guests.length]);

  // Loader
  useEffect(() => {
    if (cookies["jwt"]) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      navigate("/admin/start");
    } else {
      navigate("/admin");
      setLoading(false);
    }
  }, [loading, cookies, navigate]);

  // Delete guest from context
  guests.deleteGuest = (g: IGuest) => {
    const newGuestList = [...guests.guests];

    for (let i = 0; i < newGuestList.length; i++) {
      if (newGuestList[i]._id === g._id) {
        newGuestList.splice(i, 1);
      }
    }
    setGuests({ ...guests, guests: newGuestList });
  };

  return (
    <>
      <GuestContext.Provider value={guests}>
        {loading ? <StyledLoader> </StyledLoader> : <AdminMain></AdminMain>}
      </GuestContext.Provider>
    </>
  );
}
