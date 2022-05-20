import FetchService from "../../../Shared/FetchService";
import { BACKOFFICE_API_URL } from "../../Shared/BACKOFFICE_API_URL";

export default class EmployeeService {
  #fetch;
  #CONTROLLER = "/brands";
  constructor() {
    this.#fetch = new FetchService(BACKOFFICE_API_URL + this.#CONTROLLER);
  }
  set token(_token) {
    this.#fetch.token = _token;
  }
  async findAll({
    email,
    role,
    enabled,
    employee_id,
    office_id,
    name,
    lastName,
    dni,
  }) {
    return await this.#fetch.get({
      email,
      role,
      enabled,
      employee_id,
      office_id,
      name,
      lastName,
      dni,
    });
  }
  async findById(id) {
    return await this.#fetch.get("/" + id);
  }
  async insertEmployee({
    _id,
    email,
    password,
    role,
    enabled,
    employee_id,
    name,
    lastName,
    dni,
    office_id,
    registrationDate,
  }) {
    return await this.#fetch.post("/", {
      _id,
      email,
      password,
      role,
      enabled,
      employee_id,
      name,
      lastName,
      dni,
      office_id,
      registrationDate,
    });
  }
  async updateEmployees({
    _id,
    email,
    password,
    role,
    enabled,
    employee_id,
    name,
    lastName,
    dni,
    office_id,
    registrationDate,
  }) {
    return await this.#fetch.put("/" + _id, {
      email,
      password,
      role,
      enabled,
      employee_id,
      name,
      lastName,
      dni,
      office_id,
      registrationDate,
    });
  }
}
