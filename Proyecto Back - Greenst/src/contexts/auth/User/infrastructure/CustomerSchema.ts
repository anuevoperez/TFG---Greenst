import { prop, Ref } from "@typegoose/typegoose";
import UserSchema from "./UserSchema";

export default class CustomerSchema{
    @prop()
    public name!:string;
    @prop()
    public lastName!:string;
    @prop({ref:()=>UserSchema})
    public user!:Ref<UserSchema>;
}