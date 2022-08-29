import { createContext } from "react";
import { IAdmin } from "../models/IAdmin";

// const admin = JSON.parse(localStorage.getItem("admin"))

export interface IAdminContext {
  admin: IAdmin[];
  updateContext(updatedContext: IAdminContext): void;
}

export const AdminContext = createContext<IAdminContext>({
  admin: [],
  updateContext: () => {},
});
