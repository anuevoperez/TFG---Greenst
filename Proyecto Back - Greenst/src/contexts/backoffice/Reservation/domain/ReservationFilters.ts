import { ReservationStatus } from "./ReservationStatus";

export default interface ReservationFilters {
  vehicle_plate?: string;
  vehicle_brand_id?: string;
  vehicle_model?: string;
  customer_dni?: string;
  customer_name?: string;
  customer_lastName?: string;
  departure_office_id?: string;
  arrival_office_id?: string;
  status?: ReservationStatus;
  min_reservetaion_timestamp?: Date;
  max_reservetaion_timestamp?: Date;
  min_departure_timestamp?: Date;
  max_departure_timestamp?: Date;
  min_arrival_timestamp?: Date;
  max_arrival_timestamp?: Date;
}
