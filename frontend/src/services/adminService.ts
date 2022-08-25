import axios from "axios";
import { IAdmin } from "../models/IAdmin";

export async function getAdmin(): Promise<IAdmin[]> {
  const API = "http://localhost:4000/admin";

  return await (
    await axios.get(API)
  ).data;
}

export async function getRegister(): Promise<IAdmin[]> {
  const API = "http://localhost:4000/admin/register";

  return await (
    await axios.get(API)
  ).data;
}

export async function saveAdmin(admin: IAdmin): Promise<IAdmin[]> {
  const API = "http://localhost:4000/admin/register";
  console.log(admin);

  return await axios.post(API, admin);
}

export async function loginAdmin(admin: IAdmin): Promise<IAdmin[]> {
  const API = "http://localhost:4000";

  return await axios.post(API, admin);
}
