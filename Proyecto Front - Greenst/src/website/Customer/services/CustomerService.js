import FetchService from "../../../Shared/FetchService";
import { WEBSITE_API_URL } from "../../Shared/WEBSITE_API_URL";

export default class CustomerService {
  #fetch;
  #CONTROLLER = "/customers";
  constructor() {
    this.#fetch = new FetchService(WEBSITE_API_URL + this.#CONTROLLER);
  }
  set token(_token) {
    this.#fetch.token = _token;
  }
  async find() {
    return await this.#fetch.get();
  }
  async insertCustomer({
    email,
    password,
    enabled,
    name,
    lastName,
    gender,
    dateOfBirth,
    nationality,
    dni,
    phone,
  }) {
    return await this.#fetch.post("/", {
      email,
      password,
      enabled,
      name,
      lastName,
      gender,
      dateOfBirth,
      nationality,
      dni,
      phone,
    });
  }
  async updateCustomer({
    user_id,
    email,
    password,
    enabled,
    name,
    lastName,
    gender,
    dateOfBirt,
    nationality,
    dni,
    phone,
  }) {
    return await this.#fetch.put("/", {
      email,
      password,
      enabled,
      name,
      lastName,
      gender,
      dateOfBirt,
      nationality,
      dni,
      phone,
    });
  }
}
