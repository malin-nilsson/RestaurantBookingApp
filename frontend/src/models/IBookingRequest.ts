export interface IBookingRequest {
  id?: string
  date: string
  time: string
  amount: number
  tables: number
  message?: string
}
