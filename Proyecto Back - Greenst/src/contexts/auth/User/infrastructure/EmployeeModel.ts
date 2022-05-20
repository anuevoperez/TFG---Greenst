import { getModelForClass } from "@typegoose/typegoose";
import EmployeeSchema from "./EmployeeSchema";

export const EmployeeModel = getModelForClass(EmployeeSchema, {
  schemaOptions: { collection: "employees" }, options:{
    customName:"employeesAuth"
  }
});
