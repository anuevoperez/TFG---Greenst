import City from "../domain/City";
import CityRepository from "../domain/CityRepository";

export default class CityService{
    private _cityRepository:CityRepository;

    constructor(cityRepository:CityRepository){
        this._cityRepository=cityRepository;
    }
    async insertCity(city:City){
        await this._cityRepository.save({
            ...city, _id:undefined
        })
    }
    async updateCity(city:City){
        if(!city._id) throw new Error("Missing city id");
        await this._cityRepository.save(city)
    }
    async findAll(){
        return await this._cityRepository.findAll();
    }
    async findById(id:string){
        return await this._cityRepository.findById(id);
    }
    async deleteById(id:string){
        return await this._cityRepository.deleteById(id);
    }
}