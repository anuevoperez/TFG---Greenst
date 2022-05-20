import Pagination from "../../../shared/domain/Pagination";
import { CustomerModel } from "../../Customer/infrastructure/CustomerModel";
import { OfficeModel } from "../../Office/infrastructure/OfficeModel";
import { VehicleModel } from "../../Model/infrastructure/VehicleModel";
import BasicPagedReservationProjection from "../domain/projections/BasicPagedReservationProjection";
import BasicReservationProjection from "../domain/projections/BasicReservationProjection";
import DetailedReservationProjection from "../domain/projections/DetailedReservationProjection";
import Reservation from "../domain/Reservation";
import ReservationFilters from "../domain/ReservationFilters";
import ReservationRepository from "../domain/ReservationRepository";
import { ReservationModel } from "./ReservationModel";

export default class WReservationMongoRepository
  implements ReservationRepository
{
  async save(reservation: Reservation): Promise<void> {
    const vehicle = await VehicleModel.findOne({
      model: reservation.model_id,
      status: "available",
    });

    if (!vehicle) throw new Error("Vehicle not found");

    const customer = await CustomerModel.findOne({user:reservation.customer_id});

    if (!customer) throw new Error("Customer not found");

    const departure_office = await OfficeModel.findById(
      reservation.departure_office_id
    );

    if (!departure_office) throw new Error("Departure Office not found");

    const arrival_office = await OfficeModel.findById(
      reservation.arrival_office_id
    );

    if (!arrival_office) throw new Error("Arrival Office not found");

    const newReservation = {
      vehicle: vehicle._id,
      vehicle_brand: vehicle.brand,
      vehicle_brandName: vehicle.brandName,
      vehicle_model: vehicle.v_model,
      vehicle_modelName: vehicle.modelName,
      vehicle_plate: vehicle.plate,
      customer: customer._id,
      customer_name: customer.name,
      customer_lastName: customer.lastName,
      customer_dni: customer.dni,
      departure_office: departure_office._id,
      departure_office_locationName: departure_office.locationName,
      departure_office_location: departure_office.location,
      arrival_office: arrival_office._id,
      arrival_office_locationName: arrival_office.locationName,
      arrival_office_location: arrival_office.location,
      reservationTimestamp: reservation.reservationTimestamp,
      departureTimestamp: reservation.departureTimestamp,
      arrivalTimestamp: reservation.arrivalTimestamp,
      amount: reservation.amount,
      payment_method: reservation.payment_method,
      status: reservation.status,
    };

    if (!reservation._id) {
      await ReservationModel.create(newReservation);
      return;
    }
    await ReservationModel.updateOne(
      { _id: reservation._id },
      { $set: { ...newReservation } }
    );
  }
  async findAll(
    filter: ReservationFilters,
    pagination: Pagination
  ): Promise<BasicPagedReservationProjection | null> {
    const query: any = {};

    if (filter.vehicle_brand_id) {
      query.vehicle_brand = filter.vehicle_brand_id;
    }
    if (filter.vehicle_model) {
      query.vehicle_modelName = { $regex: filter.vehicle_model, $options: "i" };
    }
    if (filter.departure_office_id) {
      query.departure_office = filter.departure_office_id;
    }

    if (filter.status) {
      query.status = filter.status;
    }
    if (filter.min_reservation_timestamp) {
      query.reservationTimestamp = { $gte: filter.min_reservation_timestamp };
    }
    if (filter.max_reservation_timestamp) {
      query.reservationTimestamp = {
        ...query?.reservationTimestamp,
        $lte: filter.max_reservation_timestamp,
      };
    }
    if (filter.min_departure_timestamp) {
      query.departureTimestamp = { $gte: filter.min_departure_timestamp };
    }
    if (filter.max_departure_timestamp) {
      query.departureTimestamp = {
        ...query?.departureTimestamp,
        $lte: filter.max_departure_timestamp,
      };
    }
    const customer = await CustomerModel.findOne({user:filter.user_id});
    if (!customer) throw new Error("Customer not found");
    query.customer= customer._id;

    const populate: any = [];
    const projection: any = {
      customer_name: 1,
      customer_lastName: 1,
      vehicle_brandName: 1,
      vehicle_modelName: 1,
      vehicle_plate: 1,
      arrival_office_locationName: 1,
      departure_office_locationName: 1,
      reservationTimestamp: 1,
      departureTimestamp: 1,
      arrivalTimestamp: 1,
      status: 1,
      amount: 1,
    };
    const rawData = await ReservationModel.findPaged(
      pagination,
      query,
      projection,
      populate
    );
    const rawReservations = rawData.docs;

    const reservations: BasicReservationProjection[] = rawReservations.map(
      (rawReservation) => ({
        _id: rawReservation._id,
        name: rawReservation.customer_name,
        lastName: rawReservation.customer_lastName,
        brand: rawReservation.vehicle_brandName,
        model: rawReservation.vehicle_modelName,
        arrival_office_locationName: rawReservation.arrival_office_locationName,
        departure_office_locationName:
          rawReservation.departure_office_locationName,
        vehicle_plate: rawReservation.vehicle_plate,
        reservationTimestamp: rawReservation.reservationTimestamp,
        departureTimestamp: rawReservation.departureTimestamp,
        arrivalTimestamp: rawReservation.arrivalTimestamp,
        status: rawReservation.status,
        amount: rawReservation.amount,
      })
    );

    return {
      ...rawData,
      docs: reservations,
    };
  }
  async findById(id: string): Promise<DetailedReservationProjection | null> {
    const rawReservation = await ReservationModel.findById(id);
    if (!rawReservation) throw new Error("Reservation not found!");

    const result: DetailedReservationProjection = {
      vehicle_brand: rawReservation.vehicle_brandName,
      vehicle_model: rawReservation.vehicle_modelName,
      vehicle_plate: rawReservation.vehicle_plate,
      customer_name: rawReservation.customer_name,
      customer_lastName: rawReservation.customer_lastName,
      customer_dni: rawReservation.customer_dni,

      departure_office_locationName:
        rawReservation.departure_office_locationName,
      departure_office_location: rawReservation.departure_office_location,

      arrival_office_locationName: rawReservation.arrival_office_locationName,
      arrival_office_location: rawReservation.arrival_office_location,

      reservationTimestamp: rawReservation.reservationTimestamp,
      departureTimestamp: rawReservation.departureTimestamp,
      arrivalTimestamp: rawReservation.arrivalTimestamp,

      amount: rawReservation.amount,
      payment_method: rawReservation.payment_method,
      status: rawReservation.status,
    };
    return result;
  }
}
