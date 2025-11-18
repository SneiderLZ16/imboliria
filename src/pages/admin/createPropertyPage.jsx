import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext.jsx";
import { createProperty } from "../../api/propertiesApi.js";

function CreatePropertyPage() {
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");

      await createProperty(form, accessToken);

      setMessage("Propiedad creada exitosamente.");

      // Redirigir después de 1 segundo
      setTimeout(() => {
        navigate("/properties");
      }, 1200);
    } catch (err) {
      console.error(err);
      setMessage("Error creando propiedad.");
    }
  };

  return (
    <div className="page-container">
      <div className="card form-card">

        {/* BOTÓN VOLVER ARREGLADO */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{
            padding: "6px 14px",
            borderRadius: "10px",
            border: "1px solid #38bdf8",
            background: "transparent",
            color: "#38bdf8",
            cursor: "pointer",
            marginBottom: "14px",
          }}
        >
          ← Volver
        </button>

        <h1 className="page-title">Crear Propiedad</h1>

        {message && <p className="status-message">{message}</p>}

        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={form.title}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Ubicación"
            value={form.location}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Descripción"
            value={form.description}
            onChange={handleChange}
            required
          ></textarea>

          <input
            type="number"
            name="price"
            placeholder="Precio"
            value={form.price}
            onChange={handleChange}
            required
          />

          <button type="submit" className="gradient-button">
            Crear Propiedad
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePropertyPage;
