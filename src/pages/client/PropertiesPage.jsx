import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext.jsx";
import {
  getAllProperties,
  getPropertyById,
  deleteProperty,
} from "../../api/propertiesApi.js";

function PropertiesPage() {
  const navigate = useNavigate();
  const { accessToken, logout, isAdmin } = useAuth();

  const [properties, setProperties] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState("");

  
  // CARGAR TODAS LAS PROPIEDADES
  
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");
        const data = await getAllProperties(accessToken);
        setProperties(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar las propiedades.");
      } finally {
        setLoading(false);
      }
    }

    if (accessToken) load();
  }, [accessToken]);

  
  // BUSCAR POR ID
 
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    try {
      setSearchLoading(true);
      setError("");

      const property = await getPropertyById(searchId.trim(), accessToken);
      setProperties([property]);
    } catch (err) {
      console.error(err);
      setError("No se encontró una propiedad con ese ID.");
      setProperties([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleReset = async () => {
    setSearchId("");
    setError("");

    try {
      setLoading(true);
      const data = await getAllProperties(accessToken);
      setProperties(data);
    } catch (err) {
      console.error(err);
      setError("No se pudieron recargar las propiedades.");
    } finally {
      setLoading(false);
    }
  };

  
  // MODAL DETALLES
  
  const handleViewDetails = (property) => {
    const firstImage =
      property.images?.length > 0
        ? property.images[0].url
        : "https://via.placeholder.com/300x200?text=No+image";

    setSelectedProperty({
      ...property,
      imageUrl: firstImage,
    });
  };

  const handleCloseDetails = () => {
    setSelectedProperty(null);
  };

  const handleContact = () => {
    alert("Simulando contacto con el propietario.");
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

 
  // RENDER
  
  return (
    <div className="page-container">
      <div className="card properties-card">

        {/* 
            ENCABEZADO
         */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <h1 className="page-title">Properties</h1>

          <div style={{ display: "flex", gap: "10px" }}>
            {/*  CREAR SOLO PARA ADMIN */}
            {isAdmin && (
              <button
                onClick={() => navigate("/admin/properties/new")}
                style={{
                  padding: "6px 14px",
                  borderRadius: "10px",
                  border: "none",
                  background:
                    "linear-gradient(135deg, #7c3aed, #a855f7, #22d3ee)",
                  color: "#f9fafb",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                + Crear Propiedad
              </button>
            )}

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
          </div>
        </header>

        {/* 
            BUSCADOR POR ID
        */}
        <form className="search-bar" onSubmit={handleSearch}>
          <label htmlFor="propertyId" className="search-label">
            Buscar por ID
          </label>

          <div className="search-input-group">
            <input
              id="propertyId"
              type="text"
              placeholder="Ingresa el ID..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="search-input"
            />

            <button
              type="submit"
              className="search-button"
              disabled={searchLoading}
            >
              {searchLoading ? "Buscando..." : "Buscar"}
            </button>

            <button
              type="button"
              className="search-button"
              style={{
                background: "transparent",
                border: "1px solid #38bdf8",
                color: "#e5e7eb",
              }}
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>

        {/* 
            MENSAJES DE ESTADO
        */}
        {error && <p className="empty-text">{error}</p>}
        {loading && <p className="empty-text">Cargando propiedades...</p>}

        {/* 
            LISTA DE PROPIEDADES
         */}
        {!loading && properties.length > 0 && (
          <div className="properties-list">
            {properties.map((property) => {
              const firstImage =
                property.images?.length > 0
                  ? property.images[0].url
                  : "https://via.placeholder.com/300x200?text=No+image";

              return (
                <article key={property.id} className="property-card">
                  <div className="property-image-wrapper">
                    <img
                      src={firstImage}
                      alt={property.title}
                      className="property-image"
                    />
                  </div>

                  <div className="property-content">
                    <h2 className="property-title">
                      #{property.id} — {property.title}
                    </h2>

                    <p className="property-location">{property.location}</p>
                    <p className="property-description">
                      {property.description}
                    </p>

                    <p className="property-price">
                      {property.price?.toLocaleString("es-CO", {
                        style: "currency",
                        currency: "COP",
                        maximumFractionDigits: 0,
                      })}
                    </p>

                    {/* VER DETALLES */}
                    <button
                      className="property-button"
                      onClick={() => handleViewDetails(property)}
                    >
                      Ver detalles
                    </button>

                    {/*  EDITAR — SOLO ADMIN */}
                    {isAdmin && (
                      <button
                        className="property-button"
                        onClick={() =>
                          navigate(`/admin/properties/edit/${property.id}`)
                        }
                        style={{
                          marginTop: "6px",
                          background: "#7c3aed",
                        }}
                      >
                        Editar
                      </button>
                    )}

                    {/*  ELIMINAR — SOLO ADMIN */}
                    {isAdmin && (
                      <button
                        className="property-button"
                        style={{
                          marginTop: "6px",
                          background: "#ef4444",
                        }}
                        onClick={async () => {
                          if (
                            confirm(
                              "¿Seguro que deseas eliminar esta propiedad?"
                            )
                          ) {
                            try {
                              await deleteProperty(property.id, accessToken);
                              setProperties((prev) =>
                                prev.filter((p) => p.id !== property.id)
                              );
                            } catch (err) {
                              alert(err.message);
                            }
                          }
                        }}
                      >
                        Eliminar
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {!loading && properties.length === 0 && !error && (
          <p className="empty-text">No hay propiedades para mostrar.</p>
        )}
      </div>

      {/* ======================
          MODAL DETALLES
      ====================== */}
      {selectedProperty && (
        <div className="modal-overlay" onClick={handleCloseDetails}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseDetails}>
              ×
            </button>

            <h2>
              #{selectedProperty.id} — {selectedProperty.title}
            </h2>

            <div className="modal-image-wrapper">
              <img
                src={selectedProperty.imageUrl}
                className="modal-image"
                alt="property"
              />
            </div>

            <p className="modal-location">{selectedProperty.location}</p>

            <p className="modal-description">
              {selectedProperty.description}
            </p>

            <p className="modal-price">
              {selectedProperty.price?.toLocaleString("es-CO", {
                style: "currency",
                currency: "COP",
                maximumFractionDigits: 0,
              })}
            </p>

            <button className="contact-button" onClick={handleContact}>
              Contactar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PropertiesPage;
