export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  precioOriginal?: number;
  stock: number;
  categoria: string;
  marca: string;
  tipoUva?: string;
  bodega: string;
  calificacion: number;
  imagenUrl: string;
  enOferta: boolean;
  codigoBarras?: string;
  fechaCreacion?: Date;
  fechaActualizacion?: Date;
}

export interface Filtros {
  categoria: string;
  precio: string;
  marca: string;
  tipoUva: string;
  search: string;
  ordenar: string;
  bodega: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}
