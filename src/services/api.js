// Real API services for Yummi UI
// Reads base URL from VITE_API_BASE_URL, defaults to http://localhost:3000/api

const API_BASE = (import.meta?.env?.VITE_API_BASE_URL || 'http://localhost:3000/api').replace(/\/$/, '');

function toError(message, status) {
  const err = new Error(message);
  if (status) err.status = status;
  return err;
}

export async function getCategories() {
  const res = await fetch(`${API_BASE}/categories`);
  if (!res.ok) throw toError(`Failed to load categories: ${res.status}`, res.status);
  const data = await res.json();
  // const list = Array.isArray(data) ? data : data?.categories || [];
  return data.map((c) => ({
    id: c.id,
    name: c.name,
  }));
}

export async function getCountries() {
  const res = await fetch(`${API_BASE}/areas`);
  if (!res.ok) throw toError(`Failed to load areas: ${res.status}`, res.status);
  const data = await res.json();
  return (Array.isArray(data) ? data : data?.areas || []).map((item) => {
    const code = (item.id).toString().slice(0, 2).toUpperCase();
    return { code, name: item.name };
  });
}

export async function getIngredients() {
  const res = await fetch(`${API_BASE}/ingredients`);
  if (!res.ok) throw toError(`Failed to load ingredients: ${res.status}`, res.status);
  const data = await res.json();
  return data.map((i) => ({
    id: i.id,
    name: i.name,
    image: i.image,
  }));
}

// Create recipe via backend. Accepts FormData and returns created object
export async function createRecipe(formData) {
  const res = await fetch(`${API_BASE}/recipes`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw toError(text || `Failed to create recipe: ${res.status}`, res.status);
  }
  const json = await res.json().catch(() => ({}));
  return json;
}
