export interface IAdmin {
  _id?: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: string;
}
