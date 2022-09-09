import axios from "axios";
import { IAdmin } from "../models/IAdmin";

export async function getAdminStart(): Promise<IAdmin[]> {
  const API = "http://localhost:4000/admin/start";

  return await (
    await axios.get(API)
  ).data;
}

// export async function getRegister(): Promise<IAdmin[]> {
//   const API = "http://localhost:4000/admin/register";

//   return await (
//     await axios.get(API)
//   ).data;
// }

// export async function registerAdmin(admin: IAdmin): Promise<IAdmin[]> {
//   const API = "http://localhost:4000/admin/register";
//   console.log(admin);

//   return await axios.post(API, admin);
// }

// export async function getLoggedIn(): Promise<IAdmin[]> {
//   const API = "http://localhost:4000/admin/register";

//   return await (
//     await axios.get(API)
//   ).data;
// }

// export async function loginAdmin(admin: IAdmin): Promise<IAdmin[]> {
//   const API = "http://localhost:4000/admin";

//   return await axios.post(API, admin);
// }

export async function adminManageList(admins: IAdmin): Promise<IAdmin[]> {
  const API = "http://localhost:4000/admin/start";

  return await (
    await axios.get(API)
  ).data;
}

export async function deleteAdmins(admins: IAdmin): Promise<IAdmin[]> {
  const API = "http://localhost:4000/admin/manage/" + admins._id;
  return await axios.delete(API);
}
