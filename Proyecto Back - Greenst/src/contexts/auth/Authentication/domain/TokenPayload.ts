import UserRoles from "../../User/domain/UserRoles";

interface TokenPayload{
    id:string,
    name:string,
    lastName:string,
    role:UserRoles,
    office_id?:string
}
export default TokenPayload;