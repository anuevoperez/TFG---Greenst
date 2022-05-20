import { prop, Ref } from "@typegoose/typegoose";
import UserSchema from "./UserSchema";

export default class EmployeeSchema{
    @prop()
    public name!:string;
    @prop()
    public lastName!:string;
    @prop()
    public office!:string;
    @prop({required:true,ref:()=>UserSchema})
    public user!:Ref<UserSchema>;
}