import FetchService from "../../../Shared/FetchService";
import { BACKOFFICE_API_URL } from "../../Shared/BACKOFFICE_API_URL";

export default class VehicleService {
  #fetch;
  #CONTROLLER = "/vehicles";
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
  async insertReservation({
    type,
    plate,
    office_id,
    model_id,
    vin,
    status,
    registrationDate,
    lastRevision,
  }) {
    return await this.#fetch.post("/", {
      type,
      plate,
      office_id,
      model_id,
      vin,
      status,
      registrationDate,
      lastRevision,
    });
  }
  async updateOffice({
    _id,
    type,
    plate,
    office_id,
    model_id,
    vin,
    status,
    registrationDate,
    lastRevision,
  }) {
    return await this.#fetch.put("/" + _id, {
      type,
      plate,
      office_id,
      model_id,
      vin,
      status,
      registrationDate,
      lastRevision,
    });
  }
}
