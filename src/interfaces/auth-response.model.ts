// src/app/models/auth-response.model.ts
export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    role: string;
  };
}
