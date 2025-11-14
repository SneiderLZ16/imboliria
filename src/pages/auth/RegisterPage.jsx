function RegisterPage() {
  return (
    <div className="page-container">
      <div className="card">
        <h1>Registro</h1>
        <form className="form">
          <label>
            Nombre completo
            <input type="text" placeholder="Tu nombre" />
          </label>
          <label>
            Correo electrónico
            <input type="email" placeholder="ejemplo@correo.com" />
          </label>
          <label>
            Contraseña
            <input type="password" placeholder="********" />
          </label>
          <button type="submit">Crear cuenta</button>
        </form>
        <p className="helper-text">
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
