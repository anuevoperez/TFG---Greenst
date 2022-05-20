import { ReservationStatus } from "./ReservationStatus";

export default interface ReservationFilters {
  user_id:string,
  vehicle_brand_id?: string;
  vehicle_model?: string;
  departure_office_id?: string;
  status?: ReservationStatus;
  min_reservation_timestamp?: Date;
  max_reservation_timestamp?: Date;
  min_departure_timestamp?: Date;
  max_departure_timestamp?: Date;
}
