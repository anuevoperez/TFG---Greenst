import Pagination from "../../../shared/domain/Pagination";
import { ReservationModel } from "../../Reservation/infrastructure/ReservationModel";
import { UserModel } from "../../Shared/UserModel";
import Customer from "../domain/Customer";
import CustomerFilters from "../domain/CustomerFilters";
import CustomerRepository from "../domain/CustomerRepository";
import BasicCustomerProjection from "../domain/projections/BasicCustomerProjection";
import BasicPagedCustomerProjection from "../domain/projections/BasicPagedCustomerProjection";
import DetailedCustomerProjection from "../domain/projections/DetailedCustomerProjection";
import { CustomerModel } from "./CustomerModel";

export default class CustomerMongoRepository implements CustomerRepository {
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
        });
      } catch (err) {
        await UserModel.deleteOne({ _id: userInserted._id });
        throw err as Error;
      }
      return;
    }
    const customer_id = await CustomerModel.findById(customer._id);
    if (!customer_id) throw new Error("Customer not found");
    await UserModel.updateOne(
      { _id: customer_id.user },
      {
        $set: { ...newUser },
      }
    );
    await CustomerModel.updateOne(
      { _id: customer._id },
      { $set: { ...newCustomer } }
    );
  }
  async insertMany(customers: Customer[]): Promise<void> {
    const promises = customers.map(async (customer) => {
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
      const user = await UserModel.findOne({ email: customer.email });
      if (user) throw new Error("User already exists");
      const userInserted = await UserModel.create(newUser);
      await CustomerModel.create({
        ...newCustomer,
        user: userInserted._id,
      });
    });
    await Promise.all(promises);
  }
  async findById(id: string): Promise<DetailedCustomerProjection | null> {
    const rawCustomer = await CustomerModel.findById(id);
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
  async findAll(
    filter: CustomerFilters,
    pagination: Pagination
  ): Promise<BasicPagedCustomerProjection | null> {
    const query: any = {};
    if (filter.email) {
      query.email = { $regex: filter.email, $options: "i" };
    }
    if (filter.enabled) {
      query.enabled = filter.enabled;
    }
    if (filter.name) {
      query.name = { $regex: filter.name, $options: "i" };
    }
    if (filter.lastName) {
      query.lastName = { $regex: filter.lastName, $options: "i" };
    }
    if (filter.nationality) {
      query.nationality = { $regex: filter.nationality, $options: "i" };
    }
    if (filter.dni) {
      query.dni = filter.dni;
    }
    if (filter.phone) {
      query.phone = filter.phone;
    }
    const populate: any = [];
    const projection: any = {
      _id: 1,
      name: 1,
      email: 1,
      lastName: 1,
      enabled: 1,
      phone: 1,
      dni: 1,
      nationality: 1,
    };
    const rawData = await CustomerModel.findPaged(
      pagination,
      query,
      projection,
      populate
    );
    const rawCustomers = rawData.docs;

    const customers: BasicCustomerProjection[] = rawCustomers.map(
      (rawCustomer) => ({
        _id: rawCustomer._id,
        email: rawCustomer.email,
        enabled: rawCustomer.enabled,
        name: rawCustomer.name,
        lastName: rawCustomer.lastName,
        phone: rawCustomer.phone,
        dni: rawCustomer.dni,
        nationality: rawCustomer.nationality,
      })
    );

    return {
      ...rawData,
      docs: customers,
    };
  }
}
