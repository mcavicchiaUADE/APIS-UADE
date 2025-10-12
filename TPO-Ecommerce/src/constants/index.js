// API Constants
export const API_BASE_URL = "http://localhost:8081/api";

// User Roles
export const USER_ROLES = {
  USER: "user",
  ADMIN: "admin",
};

// Default User IDs
export const DEFAULT_USER_IDS = {
  ADMIN: 1,
  USER1: 2,
};

// Category IDs
export const CATEGORY_IDS = {
  ELECTRONICS: 1,
  CLOTHING: 2,
  HOME: 3,
  SPORTS: 4,
  BOOKS: 5,
};

// Product Defaults
export const PRODUCT_DEFAULTS = {
  MIN_STOCK: 0,
  MIN_PRICE: 0,
};

// Error Messages
export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: "Credenciales inválidas",
  EMAIL_EXISTS: "El email ya está registrado",
  USERNAME_EXISTS: "El nombre de usuario ya está en uso",
  PRODUCT_NOT_FOUND: "Producto no encontrado",
  USER_NOT_FOUND: "Usuario no encontrado",
};

// Token Format
export const TOKEN_PREFIX = "token_";
