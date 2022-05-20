import { getModelForClass } from "@typegoose/typegoose";
import UserSchema from './UserSchema';

export const UserModel= getModelForClass(UserSchema,{schemaOptions:{collection:"users"}});