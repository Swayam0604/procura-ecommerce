import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Products API
export const productsApi = {
  getAll: () => api.get("/products"),
  create: (data: any) => api.post("/products", data),
  delete: (id: string) => api.delete(`/products/${id}`),
};

// Orders API
export const ordersApi = {
  getAll: () => api.get("/orders"),
  create: (data: any) => api.post("/orders", data),
  delete: (id: string) => api.delete(`/orders/${id}`),
};
