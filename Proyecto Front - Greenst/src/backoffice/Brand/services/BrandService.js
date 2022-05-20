import FetchService from "../../../Shared/FetchService";
import { BACKOFFICE_API_URL } from "../../Shared/BACKOFFICE_API_URL";

export default class BrandService {
  #fetch;
  #CONTROLLER = "/brands";
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
  async insertBrand({ img, brandName }) {
    return await this.#fetch.post("/", { img, brandName });
  }
  async updateBrand({ _id, img, brandName }) {
    return await this.#fetch.put("/" + _id, { img, brandName });
  }
}
