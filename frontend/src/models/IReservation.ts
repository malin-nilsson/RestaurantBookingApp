export interface IReservation {
  _id?: string
  date: string
  time: string
  amount: number
  tables: number
  message?: string
  guestName: string
  guestEmail: string
  guestPhone: string
}
