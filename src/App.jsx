import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./Pages/auth/LoginPage.jsx";
import RegisterPage from "./Pages/auth/RegisterPage.jsx";
import HomePage from "./Pages/client/HomePage.jsx";
import AdminDashboard from "./Pages/admin/AdminDashboard.jsx";
import PropertiesPage from "./pages/client/PropertiesPage.jsx";

function App() {
  return (
    <Routes>
      {/* Público */}
      <Route path="/" element={<HomePage />} />
       <Route path="/properties" element={<PropertiesPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminDashboard />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
