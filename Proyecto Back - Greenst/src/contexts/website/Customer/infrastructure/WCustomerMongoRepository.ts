import { ReservationModel } from "../../Reservation/infrastructure/ReservationModel";
import { UserModel } from "../../Shared/UserModel";
import Customer from "../domain/Customer";
import CustomerRepository from "../domain/CustomerRepository";
import DetailedCustomerProjection from "../domain/projections/DetailedCustomerProjection";
import { CustomerModel } from "./CustomerModel";

export default class WCustomerMongoRepository implements CustomerRepository {
  async save(customer: Customer): Promise<void> {
    const newUser = {
      email: customer.email,
      password: customer.password,
      role: "cliente",
      enabled: customer.enabled,
    };
    const newCustomer = {
      name: customer.name,
      lastName: customer.lastName,
      gender: customer.gender,
      dateOfBirth: customer.dateOfBirth,
      nationality: customer.nationality,
      dni: customer.dni,
      phone: customer.phone,
      email: customer.email,
      enabled: customer.enabled,
    };
    console.log(newCustomer);
    if (!customer._id) {
      const user = await UserModel.findOne({ email: newUser.email });
      if (user) throw new Error("User already exists");
      const userInserted = await UserModel.create({
        ...newUser,
        registrationDate: new Date(),
      });
      try {
        await CustomerModel.create({
          ...newCustomer,
          user: userInserted._id,
          registrationDate: new Date(),
        });
      } catch (err) {
        await UserModel.deleteOne({ _id: userInserted._id });
        throw err as Error;
      }
      return;
    }
    const customer_id = await CustomerModel.findOne({ user: customer._id });
    if (!customer_id) throw new Error("Customer not found");
    await UserModel.updateOne(
      { _id: customer_id.user },
      {
        $set: { ...newUser },
      }
    );
    await CustomerModel.updateOne(
      { _id: customer_id._id },
      { $set: { ...newCustomer } }
    );
  }

  async findById(id: string): Promise<DetailedCustomerProjection | null> {
    const rawCustomer = await CustomerModel.findOne({ user: id });
    console.log(rawCustomer);
    if (!rawCustomer) throw new Error("Customer not found!");
    const reservations = await ReservationModel.find({
      customer: rawCustomer._id,
    })
      .sort({ reservationTimestamp: -1 })
      .select(
        "vehicle vehicle_brandName vehicle_modelName vehicle_plate reservationTimestamp status amount"
      )
      .limit(10);
    const result: DetailedCustomerProjection = {
      name: rawCustomer.name,
      lastName: rawCustomer.lastName,
      gender: rawCustomer.gender,
      dateOfBirth: rawCustomer.dateOfBirth,
      nationality: rawCustomer.nationality,
      dni: rawCustomer.dni,
      registrationDate: rawCustomer.registrationDate,
      phone: rawCustomer.phone,
      email: rawCustomer.email,
      enabled: rawCustomer.enabled,
      last10Reservations: reservations.map(
        ({
          vehicle_brandName,
          vehicle_modelName,
          vehicle_plate,
          reservationTimestamp,
          status,
          amount,
        }) => ({
          brand: vehicle_brandName,
          model: vehicle_modelName,
          vehicle_plate,
          reservationTimestamp,
          status,
          amount,
        })
      ),
    };
    return result;
  }
}
