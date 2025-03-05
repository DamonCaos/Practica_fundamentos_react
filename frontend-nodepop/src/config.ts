export const API_BASE_URL = "http://localhost:3001/api/v1";

export const API_ENDPOINTS = {
  adverts: `${API_BASE_URL}/adverts`,
  tags: `${API_BASE_URL}/adverts/tags`,
  auth: {
    login: "http://localhost:3001/api/auth/login", // ✅ Revisión aquí
    signup: `${API_BASE_URL}/auth/signup`,
  },
};
