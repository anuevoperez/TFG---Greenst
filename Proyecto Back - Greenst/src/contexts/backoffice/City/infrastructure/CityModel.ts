import { getModelForClass } from "@typegoose/typegoose";
import { CitySchema } from "./CitySchema";

export const CityModel = getModelForClass(CitySchema, {
  schemaOptions: { collection: "cities" },
}) 
