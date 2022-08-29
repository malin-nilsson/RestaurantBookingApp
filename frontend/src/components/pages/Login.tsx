import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { IAdmin } from "../../models/IAdmin";
import { getAdmin } from "../../services/adminService";
import { loginAdmin } from "../../services/adminService";
import { AdminContext, IAdminContext } from "../../context/AdminContext";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState<IAdminContext>({
    admin: [],
    updateContext: updateContext,
  });

  function updateContext(updatedContext: IAdminContext): void {
    setAdminData({ ...updatedContext });
  }

  const [admin, setAdmin] = useState<IAdmin[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const adminCred: IAdmin = {
      username: username,
      password: password,
      role: "",
    };
    loginAdmin(adminCred);
    console.log(adminCred);
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
      <>
        {admin.map((admin) => {
          return <h1 key={admin.username}>{admin.username}</h1>;
        })}
      </>
    </>
  );
}
