import Pagination from "../../../shared/domain/Pagination";
import City from "../domain/City";
import CityRepository from "../domain/CityRepository";
import { CityModel } from "./CityModel";
export default class WCityMongoRepository implements CityRepository {
 
  async findAll(): Promise<City[] | null> {
    return await CityModel.find({});
  }
  
}
