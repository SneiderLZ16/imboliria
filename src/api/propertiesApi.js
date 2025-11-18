import { API_URL } from "./config";

// Helper para armar headers con o sin token
function buildHeaders(accessToken) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  return headers;
}

// GET /api/Property
export async function getAllProperties(accessToken) {
  const res = await fetch(`${API_URL}/Property`, {
    method: "GET",
    headers: buildHeaders(accessToken),
  });

  if (res.status === 401) {
    throw new Error("No autorizado. Inicia sesión nuevamente.");
  }

  if (!res.ok) {
    const text = await res.text();
    console.error("Error en getAllProperties:", res.status, text);
    throw new Error("Error al obtener propiedades.");
  }

  return res.json();
}

// GET /api/Property/{id}
export async function getPropertyById(id, accessToken) {
  const res = await fetch(`${API_URL}/Property/${id}`, {
    method: "GET",
    headers: buildHeaders(accessToken),
  });

  if (res.status === 401) {
    throw new Error("No autorizado. Inicia sesión nuevamente.");
  }

  if (!res.ok) {
    const text = await res.text();
    console.error("Error en getPropertyById:", res.status, text);
    throw new Error("Error al obtener la propiedad.");
  }

  return res.json();
}


export async function createProperty(property, accessToken) {
  const res = await fetch(`${API_URL}/Property`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(property),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error("Error creando propiedad: " + msg);
  }

  return res.json().catch(() => ({})); 
}


export async function updateProperty(id, property, accessToken) {
  const res = await fetch(`${API_URL}/Property/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(property),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error("Error actualizando propiedad: " + msg);
  }

  return res.json().catch(() => ({}));
}

export async function deleteProperty(id, accessToken) {
  const res = await fetch(`${API_URL}/Property/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error("Error eliminando propiedad: " + msg);
  }

  return true;
}
