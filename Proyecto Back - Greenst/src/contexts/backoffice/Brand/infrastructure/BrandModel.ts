import { getModelForClass } from "@typegoose/typegoose";
import BrandSchema from "./BrandSchema";

export const BrandModel = getModelForClass(BrandSchema, {
  schemaOptions: { collection: "brands" },
});
