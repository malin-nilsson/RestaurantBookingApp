import { createContext } from "react";
import { IAdmin } from "../models/IAdmin";

export interface IAdminContext {
  admin: IAdmin[];
  updateContext(updatedContext: IAdminContext): void;
}

export const AdminContext = createContext<IAdminContext>({
  admin: [],
  updateContext: () => {},
});
