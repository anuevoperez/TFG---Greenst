import { prop, plugin, Ref } from "@typegoose/typegoose";
import paginationPlugin from "typegoose-cursor-pagination";
import UserSchema from "../../Shared/UserSchema";
import { CustomerGender } from "../domain/CustomerGender";
@plugin(paginationPlugin)
export default class CustomerSchema {
  @prop({ required: true, ref: () => UserSchema })
  public user!: Ref<UserSchema>;
  @prop({ required: true })
  public name!: string;
  @prop({ required: true })
  public lastName!: string;
  @prop({ required: true, enum: CustomerGender })
  public gender!: CustomerGender;
  @prop({ required: true })
  public dateOfBirth!: Date;
  @prop({ required: true })
  public nationality!: string;
  @prop({ required: true })
  public dni!: string;
  @prop({default: new Date() })
  public registrationDate!: Date;
  @prop({ required: true })
  public phone!: string;
  @prop({ required: true })
  public email!: string;
  @prop({ required: true })
  public enabled!: boolean;
}
