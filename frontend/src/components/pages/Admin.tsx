import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IAdmin } from "../../models/IAdmin";
import { getAdmin } from "../../services/adminService";
// import { CreateReservation } from "./CreateReservation";

export default function Admin() {
  const [admin, setAdmin] = useState<IAdmin[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

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
      <h1>LOG IN ADMIN</h1>

      <form onSubmit={loginSubmit}>
        <input
          type="text"
          placeholder="Username"
          autoComplete="off"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="off"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Log in</button>
      </form>
    </>
  );
}
