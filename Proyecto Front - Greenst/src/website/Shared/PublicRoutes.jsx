import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../../auth/pages/LoginPage";
import RegisterCustomer from "../Customer/pages/RegisterCustomer";
import ModelDetailPage from "../Model/pages/ModelDetailPage";
import ModelsPage from "../Model/pages/ModelsPage";
import PublicLayout from "./PublicLayout";
const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<ModelsPage />} />
        <Route path="vehicle">
          <Route path=":id" element={<ModelDetailPage />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterCustomer />} />
        <Route path="*" element={<Navigate to="/login" replace/>} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
