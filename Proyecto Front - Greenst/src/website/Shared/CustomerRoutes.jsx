import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CustomerProfile from '../Customer/pages/CustomerProfile'
import ModelDetailPage from '../Model/pages/ModelDetailPage'
import ModelsPage from '../Model/pages/ModelsPage'
import ReservationsPage from '../Reservation/pages/ReservationsPage'
import CustomerLayout from './CustomerLayout'
import NotFoundPage from './NotFoundPage'

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CustomerLayout />}>
        <Route index element={<ModelsPage/>} />
        <Route path="model">
          <Route path=":id" element={<ModelDetailPage />} />
        </Route>
        <Route path="reservations" element={<ReservationsPage/>} />
        <Route path="profile" element={< CustomerProfile/>} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default CustomerRoutes