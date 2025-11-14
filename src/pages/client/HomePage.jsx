function HomePage() {
  return (
    <div className="page-container">
      <div className="card">
        <h1>Inmobiliaria App</h1>
        <p>
          Bienvenido a la plataforma inmobiliaria. Aquí los clientes podrán ver
          las propiedades disponibles y los administradores gestionarlas.
        </p>
        <div className="buttons-row">
          <a href="/login" className="btn-link">
            Iniciar sesión
          </a>
          <a href="/register" className="btn-link secondary">
            Registrarse
          </a>
          <a href="/properties" className="btn-link secondary">
            Ver propiedades
          </a>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
