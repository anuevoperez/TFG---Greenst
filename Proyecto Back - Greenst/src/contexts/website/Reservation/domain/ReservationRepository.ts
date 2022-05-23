import Pagination from "../../../shared/domain/Pagination";
import BasicPagedReservationProjection from "./projections/BasicPagedReservationProjection";
import DetailedReservationProjection from "./projections/DetailedReservationProjection";
import Reservation from "./Reservation";
import ReservationFilters from "./ReservationFilters";

export default interface ReservationRepository{
    save(reservation:Reservation):Promise<void>
    findAll(filter:ReservationFilters,pagination:Pagination):Promise<BasicPagedReservationProjection|null>
    findById(id:string,customer_id:string):Promise<DetailedReservationProjection|null>
}