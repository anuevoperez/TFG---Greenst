import { getModelForClass } from "@typegoose/typegoose";
import { PaginateModel } from "typegoose-cursor-pagination";
import ReservationSchema from "./ReservationSchema";

export const ReservationModel = getModelForClass(ReservationSchema, {
  schemaOptions: {
    collection: "reservations",
  },
  options: { customName: "reservationsWebsite" }
}) as PaginateModel<ReservationSchema, typeof ReservationSchema>;
