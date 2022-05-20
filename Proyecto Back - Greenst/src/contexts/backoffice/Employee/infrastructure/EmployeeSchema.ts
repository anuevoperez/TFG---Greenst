import { plugin, prop, Ref } from "@typegoose/typegoose";
import { OfficeSchema } from "../../Office/infrastructure/OfficeSchema";
import UserSchema from "../../Shared/UserSchema";
import paginationPlugin from "typegoose-cursor-pagination";
import { EmployeeRoles } from "../domain/EmployeeRoles";

@plugin(paginationPlugin)
export default class EmployeeSchema {
  @prop({ required: true, ref: () => UserSchema })
  public user!: Ref<UserSchema>;
  @prop({ required: true, ref: () => OfficeSchema })
  public office!: Ref<OfficeSchema>;
  @prop({ required: true })
  public employee_id!: string;
  @prop({ required: true })
  public name!: string;
  @prop({ required: true })
  public lastName!: string;
  @prop({ required: true })
  public dni!: string;
  @prop({ required: true })
  public registrationDate!: Date;
  @prop({ required: true })
  public email!: string;
  @prop({ required: true, enum: EmployeeRoles })
  public role!: EmployeeRoles;
  @prop({ required: true })
  public enabled!: boolean;
}
