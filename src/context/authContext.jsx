import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest } from "../api/authApi";

const AuthContext = createContext();

function parseJwt(token) {
  try {
    const base64 = token.split(".")[1];
    const jsonPayload = atob(base64.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Error parseando JWT:", e);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [role, setRole] = useState(null); 

  // Cargar tokens guardados al iniciar
  useEffect(() => {
    const savedAccess = localStorage.getItem("accessToken");
    const savedRefresh = localStorage.getItem("refreshToken");

    if (savedAccess) {
      setAccessToken(savedAccess);

      const payload = parseJwt(savedAccess);
      if (payload) {
        // En .NET el rol suele quedar en "role" o en el claim largo:
        const r =
          payload.role ||
          payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
          null;
        setRole(r);
      }
    }

    if (savedRefresh) setRefreshToken(savedRefresh);
  }, []);

  const login = async ({ email, password }) => {
    const data = await loginRequest({ email, password });

    console.log("login response from API:", data);

    const access = data.accessToken;
    const refresh = data.refreshToken ?? null;

    if (!access) {
      throw new Error("No se recibió accessToken desde el backend.");
    }

    setAccessToken(access);
    setRefreshToken(refresh);

    localStorage.setItem("accessToken", access);
    if (refresh) {
      localStorage.setItem("refreshToken", refresh);
    } else {
      localStorage.removeItem("refreshToken");
    }

    //  Decodificar rol desde el token
    const payload = parseJwt(access);
    if (payload) {
      const r =
        payload.role ||
        payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
        null;
      setRole(r);
    } else {
      setRole(null);
    }
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setRole(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  const isAuthenticated = !!accessToken;
  const isAdmin = role === "Admin";

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        role,
        isAuthenticated,
        isAdmin, 
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
