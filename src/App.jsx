import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "layouts/admin";
import AdminLogin from "views/admin/login/Login";
import { Provider } from "react-redux";
import store from "store/store";
import ProtectedRoute from "ProtectedRoute";

const App = () => {
  return (
    <Provider store={store}>
    <Routes>
     
     <Route path="/" element={<AdminLogin />} />
      <Route path="admin/*" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>} />
      {/* <Route path="/" element={<Navigate to="/admin" replace />} /> */}
    </Routes>
    </Provider >
  );
};

export default App;
