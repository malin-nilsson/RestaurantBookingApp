import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import AdminMain from "../admin-components/AdminMain";
import { StyledLoader } from "../styled-components/Loader/StyledLoader";

export default function Admin() {
  const [guests, setGuests] = useState<GuestInterface>(defaultValue);
  const [loading, setLoading] = useState<Boolean>(true);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);

  // Loader
  useEffect(() => {
    if (cookies["jwt"]) {
      navigate("/admin/start");
      if (loading) {
        setTimeout(() => {
          setLoading(false);
        }, 700);
      }
    } else {
      navigate("/admin");
    }
  }, [loading, cookies, navigate]);

  return (
    <>{loading ? <StyledLoader> </StyledLoader> : <AdminMain></AdminMain>}</>
  );
}
