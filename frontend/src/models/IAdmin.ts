export interface IAdmin {
  id?: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: string;
}
