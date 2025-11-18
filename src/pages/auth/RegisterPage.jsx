import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerRequest } from "../../api/authApi";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username || !email || !password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      setLoading(true);
      await registerRequest({ username, email, password });
      setSuccess("Registro exitoso. Redirigiendo al login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error(err);
      setError("No se pudo registrar el usuario.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h1>Registro</h1>
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Nombre de usuario
            <input
              type="text"
              placeholder="Tu usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Correo electrónico
            <input
              type="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Contraseña
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {error && <p className="empty-text">{error}</p>}
          {success && <p className="empty-text" style={{ color: "#4ade80" }}>{success}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>
        <p className="helper-text">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
