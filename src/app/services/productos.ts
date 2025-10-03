import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Producto, PaginatedResponse } from '../../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient) {}

  // Obtener todos los productos (sin paginación)
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  // Obtener productos paginados
  getProductosPaginated(
    page: number = 0,
    size: number = 12,
    sortBy: string = 'nombre',
    sortDirection: string = 'asc'
  ): Observable<PaginatedResponse<Producto>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortDirection', sortDirection);

    return this.http.get<PaginatedResponse<Producto>>(`${this.apiUrl}/paginated`, { params });
  }

  // Obtener productos por bodega
  getProductosPorBodega(idBodega: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/bodega/${idBodega}`);
  }

  // Obtener productos por bodega paginados
  getProductosPorBodegaPaginated(
    idBodega: number,
    page: number = 0,
    size: number = 12,
    sortBy: string = 'nombre',
    sortDirection: string = 'asc'
  ): Observable<PaginatedResponse<Producto>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortDirection', sortDirection);

    return this.http.get<PaginatedResponse<Producto>>(
      `${this.apiUrl}/bodega/${idBodega}/paginated`,
      { params }
    );
  }

  // Buscar productos por nombre
  buscarProductosPorNombre(
    nombre: string,
    page: number = 0,
    size: number = 12
  ): Observable<PaginatedResponse<Producto>> {
    let params = new HttpParams()
      .set('nombre', nombre)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PaginatedResponse<Producto>>(`${this.apiUrl}/buscar`, { params });
  }

  // Obtener producto por ID
  getProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  // Obtener producto por código de barras
  getProductoPorCodigoBarras(codigoBarras: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/codigo-barras/${codigoBarras}`);
  }

  // Productos más vendidos (simulado - puedes ajustar según tu lógica de negocio)
  getProductosMasVendidos(): Observable<Producto[]> {
    // Por ahora, devolvemos productos con mayor stock como proxy
    return this.getProductos().pipe(
      map(productos => productos
        .sort((a, b) => b.stock - a.stock)
        .slice(0, 8)
      )
    );
  }

  // Crear producto
  crearProducto(idBodega: number, producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.apiUrl}/bodega/${idBodega}`, producto);
  }

  // Actualizar producto
  actualizarProducto(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
  }

  // Eliminar producto
  eliminarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
