export interface Producto {
  idProducto: number;
  idBodega: number;
  nombre: string;
  descripcion: string;
  precio: number;
  precioOriginal?: number;
  stock: number;
  codigoBarras: string;
  categoria: string;
  tipoUva: string;
  marca: string;
  imagenUrl: string;
  calificacion: number;
  aniosCosecha: string;
  codigo: string;
  bodega: string;
  enOferta?: boolean;
}
