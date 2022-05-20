import FetchService from "../../../Shared/FetchService";
import { WEBSITE_API_URL } from "../../Shared/WEBSITE_API_URL";

export default class CityService {
  #fetch;
  #CONTROLLER = "/cities";
  constructor() {
    this.#fetch = new FetchService(WEBSITE_API_URL + this.#CONTROLLER);
  }

  async findAll() {
    return await this.#fetch.get();
  }
}
