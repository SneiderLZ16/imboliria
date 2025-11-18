import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPropertyById, updateProperty } from "../../api/propertiesApi";
import { useAuth } from "../../context/authContext";

function EditPropertyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

 
  // CARGAR PROPIEDAD EXISTENTE
  
  useEffect(() => {
    async function loadData() {
      try {
        const property = await getPropertyById(id, accessToken);
        setForm({
          title: property.title || "",
          description: property.description || "",
          location: property.location || "",
          price: property.price || "",
        });
      } catch (err) {
        console.error(err);
        setMessage("Error cargando la propiedad.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id, accessToken]);

  
  // CONTROL DE FORMULARIO
 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  // SUBMIT PARA ACTUALIZAR
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      
      await updateProperty(id, { ...form, id: Number(id) }, accessToken);

      setMessage("Propiedad actualizada correctamente.");
    } catch (err) {
      console.error(err);
      setMessage("Error actualizando propiedad: " + err.message);
    }
  };

  if (loading) return <p className="empty-text">Cargando...</p>;

  return (
    <div className="page-container">
      <div className="card form-card">

        {/* BOTON VOLVER */}
        <button
          type="button"
          onClick={() => navigate("/properties")}
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

        <h1 className="page-title">Editar Propiedad #{id}</h1>

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
          />

          <input
            type="number"
            name="price"
            placeholder="Precio"
            value={form.price}
            onChange={handleChange}
            required
          />

          <button type="submit" className="gradient-button">
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPropertyPage;
