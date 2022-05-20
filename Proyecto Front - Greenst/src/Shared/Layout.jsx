import React from 'react'
import { AuthContext } from '../auth/AuthContext'
import PublicRoutes from '../website/Shared/PublicRoutes';
import UserRoles from "../Shared/UserRoles";
import CustomerRoutes from '../website/Shared/CustomerRoutes';
import AdminRoutes from '../backoffice/Shared/AdminRoutes';
import GestorRoutes from '../backoffice/Shared/GestorRoutes';
const Layout = () => {
  const {user}=React.useContext(AuthContext);
  const userInfo=user?.user;
  if(!user) return <PublicRoutes/>
  if(userInfo.role=== UserRoles.CLIENTE) return <CustomerRoutes/>
  if(userInfo.role=== UserRoles.GESTOR) return <GestorRoutes/>
  if(userInfo.role=== UserRoles.ENCARGADO) return <AdminRoutes/>
}

export default Layout