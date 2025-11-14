function LoginPage() {
  return (
    <div className="page-container">
      <div className="card">
        <h1>Iniciar sesión</h1>
        <form className="form">
          <label>
            Correo electrónico
            <input type="email" placeholder="ejemplo@correo.com" />
          </label>
          <label>
            Contraseña
            <input type="password" placeholder="********" />
          </label>
          <button type="submit">Entrar</button>
        </form>
        <p className="helper-text">
          ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
