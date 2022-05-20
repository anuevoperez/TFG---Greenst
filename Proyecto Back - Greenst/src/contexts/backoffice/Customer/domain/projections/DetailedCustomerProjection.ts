import { ReservationStatus } from "../../../Reservation/domain/ReservationStatus";
import { CustomerGender } from "../CustomerGender";

interface CustomerLast10ReservationsProjection{
    brand:string,
    model:string,
    vehicle_plate:string,
    reservationTimestamp:Date,
    status:ReservationStatus,
    amount:number;
}

export default interface DetailedCustomerProjection{
    name:string;
    lastName:string;
    gender:CustomerGender;
    dateOfBirth:Date;
    nationality:string;
    dni:string;
    registrationDate:Date;
    phone:string;
    email:string;
    enabled:boolean;
    last10Reservations:CustomerLast10ReservationsProjection[];
}