import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext.jsx";

function AdminDashboard() {
  const navigate = useNavigate();
  const { isAdmin, role, logout } = useAuth();

  const handleCreateClick = () => {
    navigate("/admin/properties/new");
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="page-container">
      <div className="card properties-card">
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <div>
            <h1 className="page-title">Admin Dashboard</h1>
            <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
              Rol actual: <strong>{role || "Desconocido"}</strong>
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            style={{
              padding: "6px 14px",
              borderRadius: "999px",
              border: "none",
              background: "#ef4444",
              color: "#f9fafb",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </header>

        {!isAdmin && (
          <p className="empty-text">
            No tienes permisos de administrador para gestionar propiedades.
          </p>
        )}

        {isAdmin && (
          <div>
            <p className="empty-text">
              Bienvenido, admin. Desde aquí puedes gestionar las propiedades.
            </p>

            <div style={{ marginTop: "16px" }}>
              <button
                type="button"
                onClick={handleCreateClick}
                style={{
                  padding: "10px 18px",
                  borderRadius: "10px",
                  border: "none",
                  background:
                    "linear-gradient(135deg, #7c3aed, #a855f7, #22d3ee)",
                  color: "#f9fafb",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 8px 25px rgba(59, 130, 246, 0.4)",
                }}
              >
                + Crear nueva propiedad
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
