import Pagination from "../../../shared/domain/Pagination";
import Vehicle from "../domain/Vehicle";
import VehicleFilters from "../domain/VehicleFilters";
import VehicleRepository from "../domain/VehicleRepository";

export default class VehicleService{
    private _vehicleRepository:VehicleRepository;
    constructor(vehicleRepository:VehicleRepository){
        this._vehicleRepository=vehicleRepository;
    }
    async insertVehicle(vehicle:Vehicle){
        await this._vehicleRepository.save({...vehicle,_id:undefined});
    }
    async updateVehicle(vehicle:Vehicle){
        if(!vehicle._id) throw new Error("Missing vehicle id");
        await this._vehicleRepository.save(vehicle)
    }
    async findAll(filters:VehicleFilters,pagination:Pagination){
        return await this._vehicleRepository.findAll(filters,pagination);
    }
    async findById(id:string){
        return await this._vehicleRepository.findById(id);
    }
}