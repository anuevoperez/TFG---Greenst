import GeoJSONSchema from "../../../../shared/infrastructure/GeoJSONSchema";
import { PaymentMethods } from "../PaymentMethods";
import { ReservationStatus } from "../ReservationStatus";

export default interface DetailedReservationProjection {
  vehicle_brand: string;
  vehicle_model: string;
  vehicle_plate: string;
  customer_name: string;
  customer_lastName: string;
  customer_dni: string;

  departure_office_locationName: string;
  departure_office_location: GeoJSONSchema;

  arrival_office_locationName: string;
  arrival_office_location: GeoJSONSchema;

  reservationTimestamp: Date;
  departureTimestamp: Date | null;
  arrivalTimestamp: Date | null;

  amount: number;
  payment_method: PaymentMethods;
  status:ReservationStatus;
}
