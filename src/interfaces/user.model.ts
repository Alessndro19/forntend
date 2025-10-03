// src/app/models/user.model.ts
export interface User {
  id?: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  role?: string;
  bodega_id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  telefono?: string;
  bodega_id?: number;
}
