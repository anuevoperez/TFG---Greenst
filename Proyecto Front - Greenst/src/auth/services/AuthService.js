import FetchService from "../../Shared/FetchService";
import { AUTH_URL } from "./AUTH_URL";

export default class AuthService {
  #fetch;
  #CONTROLLER = "/auth";
  constructor() {
    this.#fetch = new FetchService(AUTH_URL + this.#CONTROLLER);
  }

  async login({ email, password }) {
    const user = await this.#fetch.post("/login", { email, password });
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }
  async logout() {
    localStorage.removeItem("token");
  }
}
