import UserRoles from "./UserRoles";

interface User {
  _id: string;
  office_id?:string|undefined;
  name?:string|undefined;
  lastName?:string|undefined;
  role: UserRoles;
  email: string;
  password: string;
  passwordResetToken: string|undefined;
  passwordResetExpires: Date|undefined;
  passwordChangedAt: Date|undefined;
  creationDate: Date;
  enabled: boolean;
}
export default User;
