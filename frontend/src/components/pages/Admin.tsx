import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { IAdmin } from "../../models/IAdmin";
import { getAdmin } from "../../services/adminService";
import { CreateReservation } from "./CreateReservation";

export default function Admin() {
  const [admin, setAdmin] = useState<IAdmin[]>([]);

  useEffect(() => {
    getAdmin()
      .then((res) => {
        console.log(res);
        setAdmin(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      {admin.map((admin) => {
        return <h1 key={admin.username}>{admin.username}</h1>;
      })}
    </>
  );
}
