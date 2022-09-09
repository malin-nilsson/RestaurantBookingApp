import { createContext } from "react";
import { IAdmin } from "../models/IAdmin";

// const admin = JSON.parse(localStorage.getItem("admin"))

export interface AdminInterface {
  adminDb: IAdmin[];
  deleteUser(d: IAdmin): void;
}

export const startValue = {
  adminDb: [],
  deleteUser: (d: IAdmin) => {},
};

export const AdminContext = createContext(startValue);
