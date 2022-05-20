import City from "./City";
import Pagination from "../../../shared/domain/Pagination";
export default interface CityRepository{
    save(city:City):Promise<void>;
    insertMany(cities:City[]):Promise<void>;
    findAll():Promise<null|City[]>;
    findById(id:string):Promise<null|City>;
    deleteById(id:string):Promise<void>;
}