import { getModelForClass } from "@typegoose/typegoose";
import { OfficeSchema } from "./OfficeSchema";

export const OfficeModel = getModelForClass(OfficeSchema, {
  schemaOptions: { collection: "offices" },
  options: { customName: "officesWebsite" },
});
