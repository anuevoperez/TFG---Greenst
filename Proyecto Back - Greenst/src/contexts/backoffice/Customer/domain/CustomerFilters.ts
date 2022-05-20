import UserRoles from "../../Shared/UserRoles";
import { CustomerGender } from "./CustomerGender";

export default interface CustomerFilters{
    email?:string,
    enabled?:boolean,
    name?:string,
    lastName?:string,
    nationality?:string,
    dni?:string,
    phone?:string,
}