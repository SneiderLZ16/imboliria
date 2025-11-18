import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/client/HomePage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import PropertiesPage from "./pages/client/PropertiesPage.jsx";
import AdminDashboard from "pages/admin/AdminDashboard.jsx";
import CreatePropertyPage from "./pages/admin/createPropertyPage.jsx";

import PrivateRoute from "./routes/privateRoute.jsx";
import EditPropertyPage from "./pages/admin/editPropertyPage.jsx";

function App() {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protegidas (requieren estar logueado) */}
      <Route
        path="/properties"
        element={
          <PrivateRoute>
            <PropertiesPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/properties/new"
        element={
          <PrivateRoute>
            <CreatePropertyPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/properties/edit/:id"
        element={
          <PrivateRoute>
            <EditPropertyPage />
          </PrivateRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
