import { CustomerGender } from "./CustomerGender";

export default interface Customer{
    _id?:string,
    email:string,
    password?:string,
    enabled:boolean,
    name:string,
    lastName:string,
    gender:CustomerGender,
    dateOfBirth:Date,
    nationality:string,
    dni:string,
    phone:string,
}