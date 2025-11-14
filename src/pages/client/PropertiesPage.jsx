import { useState } from "react";
import { mockProperties } from "././mocks/properties";

function PropertiesPage() {
  const [searchId, setSearchId] = useState("");

  // Propiedades filtradas por ID (si hay algo en el input)
  const filteredProperties = searchId.trim()
    ? mockProperties.filter((p) => p.id === searchId.trim())
    : mockProperties;

  const handleSubmit = (e) => {
    e.preventDefault();
    // No hacemos nada especial aún, el filtro ya actúa con el estado
    if (!searchId.trim()) return;
    console.log("Buscando propiedad con ID:", searchId);
  };

  return (
    <div className="page-container">
      <div className="card properties-card">
        <h1 className="page-title">Properties</h1>

        <form className="search-bar" onSubmit={handleSubmit}>
          <label htmlFor="propertyId" className="search-label">
            Buscar por ID
          </label>
          <div className="search-input-group">
            <input
              id="propertyId"
              type="text"
              placeholder="Ingresa el ID de la propiedad..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              Buscar
            </button>
          </div>
        </form>

        {/* Lista de propiedades */}
        <div className="properties-list">
          {filteredProperties.length === 0 ? (
            <p className="empty-text">
              No se encontraron propiedades con ese ID.
            </p>
          ) : (
            filteredProperties.map((property) => (
              <article key={property.id} className="property-card">
                <div className="property-image-wrapper">
                  <img
                    src={property.imageUrl}
                    alt={property.title}
                    className="property-image"
                  />
                </div>
                <div className="property-content">
                  <h2 className="property-title">
                    #{property.id} - {property.title}
                  </h2>
                  <p className="property-location">{property.location}</p>
                  <p className="property-description">
                    {property.description}
                  </p>
                  <p className="property-price">
                    {property.price.toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                      maximumFractionDigits: 0,
                    })}
                  </p>
                  <button className="property-button">
                    Ver detalles
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default PropertiesPage;
