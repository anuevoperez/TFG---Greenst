import Pagination from "../../../shared/domain/Pagination";
import Reservation from "../domain/Reservation";
import ReservationFilters from "../domain/ReservationFilters";
import ReservationRepository from "../domain/ReservationRepository";

export default class WReservationService{
    private _reservationRepository:ReservationRepository;
    constructor(reservationRepository:ReservationRepository){
        this._reservationRepository=reservationRepository;
    }
    async insertReservation(reservation:Reservation){
        await this._reservationRepository.save({...reservation,_id:undefined});
    }
    async updateReservation(reservation:Reservation){
        if(!reservation._id) throw new Error("Missing reservation id");
        await this._reservationRepository.save(reservation);
    }
    async findAll(filters:ReservationFilters,pagination:Pagination){
        return await this._reservationRepository.findAll(filters,pagination);
    }
    async findById(id:string,customer_id:string){
        return await this._reservationRepository.findById(id,customer_id);
    }
}