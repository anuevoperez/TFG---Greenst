import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import CreateEmployeePage from '../Employee/pages/CreateEmployeePage'
import EmployeesPage from '../Employee/pages/EmployeesPage'
import UpdateEmployeePage from '../Employee/pages/UpdateEmployeePage'
import AdminLayout from './AdminLayout'

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={< AdminLayout/>}>
        
        <Route index element={<EmployeesPage />} />
        <Route path="employees">
          <Route index element={<EmployeesPage />}/>
          <Route path="create" element={<CreateEmployeePage/>}/>
          <Route path=":id" element={<UpdateEmployeePage />} />
        </Route>
        <Route path="brands">
          <Route index element={<EmployeesPage />}/>
          <Route path="create" element={<CreateEmployeePage/>}/>
          <Route path=":id" element={<UpdateEmployeePage />} />
        </Route>
        <Route path="customers">
          <Route index element={<EmployeesPage />}/>
          <Route path="create" element={<CreateEmployeePage/>}/>
          <Route path=":id" element={<UpdateEmployeePage />} />
        </Route>
        <Route path="employees">
          <Route index element={<EmployeesPage />}/>
          <Route path="create" element={<CreateEmployeePage/>}/>
          <Route path=":id" element={<UpdateEmployeePage />} />
        </Route>
        <Route path="models">
          <Route index element={<EmployeesPage />}/>
          <Route path="create" element={<CreateEmployeePage/>}/>
          <Route path=":id" element={<UpdateEmployeePage />} />
        </Route>
        <Route path="offices">
          <Route index element={<EmployeesPage />}/>
          <Route path="create" element={<CreateEmployeePage/>}/>
          <Route path=":id" element={<UpdateEmployeePage />} />
        </Route>
        <Route path="reservations">
          <Route index element={<EmployeesPage />}/>
          <Route path="create" element={<CreateEmployeePage/>}/>
          <Route path=":id" element={<UpdateEmployeePage />} />
        </Route>
        <Route path="vehicles">
          <Route index element={<EmployeesPage />}/>
          <Route path="create" element={<CreateEmployeePage/>}/>
          <Route path=":id" element={<UpdateEmployeePage />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/login" replace/>} />
      </Route>
    </Routes>
  )
}

export default AdminRoutes