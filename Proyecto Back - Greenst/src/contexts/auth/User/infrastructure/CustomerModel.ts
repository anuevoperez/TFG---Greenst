import { getModelForClass } from "@typegoose/typegoose";
import CustomerSchema from "./CustomerSchema";

export const CustomerModel = getModelForClass(CustomerSchema, {
  schemaOptions: {
    collection: "customers",
  },
  options:{
    customName:"customersAuth"
  }
});
