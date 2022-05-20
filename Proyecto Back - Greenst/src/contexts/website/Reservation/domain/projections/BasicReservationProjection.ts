import { ReservationStatus } from "../ReservationStatus";

export default interface BasicReservationProjection {
  _id:string;
  name:string;
  lastName:string;
  brand: string;
  model: string;
  arrival_office_locationName:string;
  departure_office_locationName:string;
  vehicle_plate: string;
  reservationTimestamp: Date;
  departureTimestamp?:Date|null;
  arrivalTimestamp?:Date|null;
  status: ReservationStatus;
  amount: number;
}
