import FetchService from "../../../Shared/FetchService";
import { BACKOFFICE_API_URL } from "../../Shared/BACKOFFICE_API_URL";

export default class ModelService {
  #fetch;
  #CONTROLLER = "/models";
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
  async insertModel({ img, brand_id, modelName }) {
    return await this.#fetch.post("/", {
      img,
      brand_id,
      modelName,
    });
  }
  async updateModel({ _id, img, brand_id, modelName }) {
    return await this.#fetch.put("/" + _id, {
      img,
      brand_id,
      modelName,
    });
  }
}
