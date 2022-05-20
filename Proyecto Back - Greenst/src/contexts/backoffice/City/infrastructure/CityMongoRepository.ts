import Pagination from "../../../shared/domain/Pagination";
import City from "../domain/City";
import CityRepository from "../domain/CityRepository";
import { CityModel } from "./CityModel";
import { IPaginateOptions } from "typegoose-cursor-pagination";
export default class CityMongoRepository implements CityRepository {
  async insertMany(cities: City[]): Promise<void> {
    const newCities = cities.map((city) => ({
      _id: undefined,
      cityName: city.cityName,
    }));
    await CityModel.insertMany(newCities);
  }
  async save(city: City): Promise<void> {
    if (city._id) {
      await CityModel.updateOne(
        { _id: city._id },
        { $set: { ...city , _id: undefined} },
        { upsert: true }
      );
      return;
    }
    await CityModel.create(city);
  }

  async findAll(): Promise<City[] | null> {
    return await CityModel.find({});
  }
  
  async findById(id:string): Promise<City | null> {
    return await CityModel.findById(id);   
  }
  
  async deleteById(id: string): Promise<void> {
    await CityModel.deleteOne({ _id: id });
  }
}
