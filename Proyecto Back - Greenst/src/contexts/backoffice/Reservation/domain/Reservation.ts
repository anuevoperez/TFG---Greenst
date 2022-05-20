import { PaymentMethods } from "./PaymentMethods";
import { ReservationStatus } from "./ReservationStatus";

export default interface Reservation {
  _id?: string,
  vehicle_id: string,
  customer_id: string,
  departure_office_id: string,
  arrival_office_id: string,
  reservationTimestamp?: Date,
  departureTimestamp: Date|null,
  arrivalTimestamp: Date|null,
  amount: number,
  payment_method: PaymentMethods,
  status: ReservationStatus,
}
