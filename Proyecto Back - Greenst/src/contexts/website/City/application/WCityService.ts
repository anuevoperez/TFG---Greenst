import CityRepository from "../domain/CityRepository";

export default class WCityService {
  private _cityRepository: CityRepository;

  constructor(cityRepository: CityRepository) {
    this._cityRepository = cityRepository;
  }

  async findAll() {
    return await this._cityRepository.findAll();
  }
}
