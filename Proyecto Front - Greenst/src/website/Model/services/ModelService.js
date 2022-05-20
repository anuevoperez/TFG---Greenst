import FetchService from "../../../Shared/FetchService";
import { WEBSITE_API_URL } from "../../Shared/WEBSITE_API_URL";

export default class ModelService {
  #fetch;
  #CONTROLLER = "/models";
  constructor() {
    this.#fetch = new FetchService(WEBSITE_API_URL + this.#CONTROLLER);
  }

  async findAll({ type, city_id, office_id, brand_id, modelName }) {
    return await this.#fetch.get("/", {
      type,
      city_id,
      office_id,
      brand_id,
      modelName,
    });
  }
  async findById(id) {
    return await this.#fetch.get("/" + id);
  }
}
