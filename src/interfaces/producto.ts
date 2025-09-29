export interface Producto {
  idProducto?: number;
  idBodega: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  codigoBarras: string;
  categoria: string;
  tipoUva: string;
  marca: string;
  imagenUrl?: string;
  calificacion?: number; // 1-5 estrellas
  aniosCosecha?: string;
  codigo?: string;
  bodega?: string;
  enOferta?: boolean;
  precioOriginal?: number;
}
