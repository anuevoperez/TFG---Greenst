import { prop } from "@typegoose/typegoose";
import Pagination from "../../../shared/domain/Pagination";
import { CitySchema } from "../../City/infrastructure/CitySchema";
import { OfficeSchema } from "../../Office/infrastructure/OfficeSchema";
import { UserModel } from "../../Shared/UserModel";
import Employee from "../domain/Employee";
import EmployeeFilters from "../domain/EmployeeFilters";
import EmployeeRepository from "../domain/EmployeeRepository";
import BasicEmployeeProjection from "../domain/projections/BasicEmployeeProjection";
import BasicPagedEmployeeProjection from "../domain/projections/BasicPagedEmployeeProjection";
import DetailedEmployeeProjection from "../domain/projections/DetailedEmployeeProjection";
import { EmployeeModel } from "./EmployeeModel";

export default class EmployeeMongoRepository implements EmployeeRepository {
  async save(employee: Employee): Promise<void> {
    const newUser = {
      email: employee.email,
      password: employee.password,
      role: employee.role,
      enabled: employee.enabled,
    };
    const newEmployee = {
      employee_id: employee.employee_id,
      email: employee.email,
      role: employee.role,
      enabled: employee.enabled,
      name: employee.name,
      lastName: employee.lastName,
      dni: employee.dni,
      registrationDate: new Date(),
      office: employee.office_id,
    };
    if (!employee._id) {
      const user = await UserModel.findOne({ email: employee.email });
      if (user) throw new Error("User already exists");
      const employeeId= await EmployeeModel.findOne({employee_id:employee.employee_id});
      if(employeeId) throw new Error("Employee already exists");
      const userInserted = await UserModel.create(newUser);
      try {
        await EmployeeModel.create({
          ...newEmployee,
          user: userInserted._id,
        });
      } catch (err) {
        await UserModel.deleteOne({ _id: userInserted._id });
        throw err as Error;
      }
      return;
    }
    const tempEmployee = await EmployeeModel.findOne({ _id: employee._id });
    if (!tempEmployee) throw new Error("Employee not found");
    await UserModel.updateOne(
      { _id: tempEmployee.user },
      {
        $set: { ...newUser },
      }
    );
    await EmployeeModel.updateOne(
      { _id: employee._id },
      { $set: { ...newEmployee } }
    );
  }
  async insertMany(employees: Employee[]): Promise<void> {
    const promises = employees.map(async (employee) => {
      const newUser = {
        email: employee.email,
        password: employee.password,
        role: employee.role,
        enabled: employee.enabled,
      };
      const newEmployee = {
        employee_id: employee.employee_id,
        email: employee.email,
        role: employee.role,
        enabled: employee.enabled,
        name: employee.name,
        lastName: employee.lastName,
        dni: employee.dni,
        registrationDate: new Date(),
        office: employee.office_id,
      };
      const user = await UserModel.findOne({ email: employee.email });
      if (user) throw new Error("User already exists");
      const employeeId= await EmployeeModel.findOne({employee_id:employee.employee_id});
      if(employeeId) throw new Error("Employee already exists");
      const userInserted = await UserModel.create(newUser);
      await EmployeeModel.create({
        ...newEmployee,
        user: userInserted._id,
      });
    });
    await Promise.all(promises);
  }
  async findAll(
    filter: EmployeeFilters,
    pagination: Pagination
  ): Promise<BasicPagedEmployeeProjection | null> {
    const query: any = {};

    if (filter.email) {
      query.email = { $regex: filter.email, $options: "i" };
    }
    if (filter.role) {
      query.role = filter.role;
    }
    if (filter.enabled) {
      query.enabled = filter.enabled;
    }
    if (filter.employee_id) {
      query.employee_id = filter.employee_id;
    }
    if (filter.office_id) {
      query.office = filter.office_id;
    }
    if (filter.name) {
      query.name = { $regex: filter.name, $options: "i" };
    }
    if (filter.lastName) {
      query.lastName = { $regex: filter.lastName, $options: "i" };
    }
    if (filter.dni) {
      query.dni = { $reges: filter.dni };
    }
    const projection: any = {
      _id: 1,
      employee_id: 1,
      email: 1,
      role: 1,
      name: 1,
      lastName: 1,
      enabled: 1,
    };
    const populate: any = [];
    const rawData = await EmployeeModel.findPaged(
      pagination,
      query,
      projection,
      populate
    );
    const rawEmployees = rawData.docs;
    const result: BasicEmployeeProjection[] = rawEmployees.map(
      (rawEmployee) => {
        return {
          _id: rawEmployee._id as string,
          employee_id: rawEmployee.employee_id,
          name: rawEmployee.name,
          lastName: rawEmployee.lastName,
          email: rawEmployee.email,
          role: rawEmployee.role,
          enabled: rawEmployee.enabled,
        };
      }
    );
    return {
      ...rawData,
      docs: result,
    };
  }
  async findById(id: string): Promise<DetailedEmployeeProjection | null> {
    const rawEmployee = await EmployeeModel.findById(id).populate([
      {
        path: "office",
        select: "locationName",
        populate: {
          path: "city",
          select: "cityName",
        },
      },
    ]);
    if (!rawEmployee) throw new Error("Employee not found");

    const office = rawEmployee.office as OfficeSchema;
    const city = office.city as CitySchema;
    const locationName = office.locationName;
    const cityName = city.cityName;

    return {
      _id: rawEmployee._id,
      employee_id:rawEmployee.employee_id,
      city: cityName,
      officeLocationName: locationName,
      name: rawEmployee.name,
      lastName: rawEmployee.lastName,
      dni: rawEmployee.dni,
      registrationDate: rawEmployee.registrationDate,
      email: rawEmployee.email,
      role: rawEmployee.role,
      enabled: rawEmployee.enabled,
    };
  }
}
