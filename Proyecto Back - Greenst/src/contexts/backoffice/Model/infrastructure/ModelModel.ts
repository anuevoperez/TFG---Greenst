import { getModelForClass } from "@typegoose/typegoose";
import ModelSchema from "./ModelSchema";

export const ModelModel= getModelForClass(ModelSchema,{schemaOptions:{collection:"models"}});