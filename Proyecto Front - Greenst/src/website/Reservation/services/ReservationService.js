import FetchService from "../../../Shared/FetchService";
import { WEBSITE_API_URL } from "../../Shared/WEBSITE_API_URL";

export default class ReservationService {
  #fetch;
  #CONTROLLER = "/reservations";
  constructor() {
    this.#fetch = new FetchService(WEBSITE_API_URL + this.#CONTROLLER);
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
    vehicle_id,
    user_id,
    departure_office_id,
    arrival_office_id,
    reservationTimestamp,
    departureTimestamp,
    arrivalTimestamp,
    amount,
    payment_method,
    status,
  }) {
    return await this.#fetch.post("/", {
      vehicle_id,
      user_id,
      departure_office_id,
      arrival_office_id,
      reservationTimestamp,
      departureTimestamp,
      arrivalTimestamp,
      amount,
      payment_method,
      status,
    });
  }
  async updateOffice({
    _id,
    vehicle_id,
    user_id,
    departure_office_id,
    arrival_office_id,
    reservationTimestamp,
    departureTimestamp,
    arrivalTimestamp,
    amount,
    payment_method,
    status,
  }) {
    return await this.#fetch.put("/" + _id, {
      vehicle_id,
      user_id,
      departure_office_id,
      arrival_office_id,
      reservationTimestamp,
      departureTimestamp,
      arrivalTimestamp,
      amount,
      payment_method,
      status,
    });
  }
}
