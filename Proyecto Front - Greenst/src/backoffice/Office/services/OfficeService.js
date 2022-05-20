import FetchService from "../../../Shared/FetchService";
import { BACKOFFICE_API_URL } from "../../Shared/BACKOFFICE_API_URL";

export default class OfficeService {
  #fetch;
  #CONTROLLER = "/offices";
  constructor() {
    this.#fetch = new FetchService(BACKOFFICE_API_URL + this.#CONTROLLER);
  }
  set token(_token) {
    this.#fetch.token = _token;
  }
  async findAll() {
    return await this.#fetch.get();
  }
  async findById(id) {
    return await this.#fetch.get("/" + id);
  }
  async insertOffice({
    _id,
    city_id,
    locationName,
    postalCode,
    fullLocation,
    telephone,
    location,
    status,
  }) {
    return await this.#fetch.post("/", {
      city_id,
      locationName,
      postalCode,
      fullLocation,
      telephone,
      location,
      status,
    });
  }
  async updateOffice({
    _id,
    city_id,
    locationName,
    postalCode,
    fullLocation,
    telephone,
    location,
    status,
  }) {
    return await this.#fetch.put("/" + _id, {
      city_id,
      locationName,
      postalCode,
      fullLocation,
      telephone,
      location,
      status,
    });
  }
}
