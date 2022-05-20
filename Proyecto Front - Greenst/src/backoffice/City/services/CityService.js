import FetchService from "../../../Shared/FetchService";
import { BACKOFFICE_API_URL } from "../../Shared/BACKOFFICE_API_URL";

export default class CityService {
    #fetch;
    #CONTROLLER = "/cities";
    constructor() {
      this.#fetch = new FetchService(BACKOFFICE_API_URL + this.#CONTROLLER);
    }
    set token(_token){
        this.#fetch.token=_token
    }
    async findAll() {
      return await this.#fetch.get();
    }
    async findById(id) {
      return await this.#fetch.get("/" + id);
    }
    async insertCity({ cityName }) {
      return await this.#fetch.post("/", { cityName });
    }
    async updateCity({ _id, cityName }) {
      return await this.#fetch.put("/" + _id, { cityName });
    }
  }
  