import { prop } from "@typegoose/typegoose";
import UserRoles from "../domain/UserRoles";

export default class UserSchema {
  @prop({ required: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  @prop({ required: true, default: new Date() })
  public creationDate!: Date;

  @prop({ required: true, enum: UserRoles })
  public role!: UserRoles;

  @prop()
  public passwordResetToken!: string;

  @prop()
  public passwordResetExpires!: Date;

  @prop()
  public passwordChangedAt!: Date;

  @prop({ required: true })
  public enabled!: boolean;
}
