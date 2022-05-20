import { getModelForClass } from "@typegoose/typegoose";
import { PaginateModel } from "typegoose-cursor-pagination";
import ReservationSchema from "./ReservationSchema";

export const ReservationModel = getModelForClass(ReservationSchema, {
  schemaOptions: { collection: "reservations" },
}) as PaginateModel<ReservationSchema, typeof ReservationSchema>;
