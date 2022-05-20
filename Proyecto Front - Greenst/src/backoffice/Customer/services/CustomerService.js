import FetchService from "../../../Shared/FetchService";
import { BACKOFFICE_API_URL } from "../../Shared/BACKOFFICE_API_URL";

export default class CustomerService {
  #fetch;
  #CONTROLLER = "/customers";
  constructor() {
    this.#fetch = new FetchService(BACKOFFICE_API_URL + this.#CONTROLLER);
  }
  set token(_token) {
    this.#fetch.token = _token;
  }
  async findAll({ email, enabled, name, lastName, nationality, dni, phone }) {
    return await this.#fetch.get("/", {
      email,
      enabled,
      name,
      lastName,
      nationality,
      dni,
      phone,
    });
  }
  async findById(id) {
    return await this.#fetch.get("/" + id);
  }
  async insertCustomer({
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
    return await this.#fetch.post("/", {
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
  async updateCustomer({
    _id,
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
    return await this.#fetch.put("/" + _id, {
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
