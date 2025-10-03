import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError, BehaviorSubject } from 'rxjs';
import { Producto } from '../../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = 'http://localhost:8080/api/productos';
  private productosSubject = new BehaviorSubject<Producto[]>([]);
  public productos$ = this.productosSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Obtener productos con filtros
  getProductos(filtros?: any): Observable<Producto[]> {
    let params = new HttpParams();

    if (filtros) {
      Object.keys(filtros).forEach(key => {
        if (filtros[key] && filtros[key] !== 'todos') {
          params = params.set(key, filtros[key]);
        }
      });
    }

    return this.http.get<Producto[]>(this.apiUrl, { params }).pipe(
      map(productos => productos.map(p => this.mapearProducto(p))),
      catchError(this.handleError)
    );
  }

  // Obtener productos más vendidos - CORREGIDO
  getProductosMasVendidos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/mas-vendidos`).pipe(
      map(productos => productos.map(p => this.mapearProducto(p))),
      catchError(this.handleError)
    );
  }

  // Obtener productos por bodega
  getProductosPorBodega(idBodega: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/bodega/${idBodega}`).pipe(
      map(productos => productos.map(p => this.mapearProducto(p))),
      catchError(this.handleError)
    );
  }

  // Buscar productos
  buscarProductos(termino: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/buscar`, {
      params: { search: termino }
    }).pipe(
      map(productos => productos.map(p => this.mapearProducto(p))),
      catchError(this.handleError)
    );
  }

  // Obtener producto por ID
  getProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`).pipe(
      map(producto => this.mapearProducto(producto)),
      catchError(this.handleError)
    );
  }

  // Actualizar stock después de venta
  actualizarStock(idProducto: number, cantidad: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${idProducto}/stock`, { cantidad });
  }

  private mapearProducto(producto: any): Producto {
    return {
      ...producto,
      // Mapear campos del backend a tu interfaz
      imagenUrl: producto.imagen_url || producto.imagenUrl || 'assets/images/default-product.jpg',
      calificacion: this.calcularPromedioValoraciones(producto.valoraciones),
      enOferta: this.tieneDescuentoActivo(producto.descuentos),
      precioOriginal: producto.precio_original || producto.precioOriginal || producto.precio
    };
  }

  private calcularPromedioValoraciones(valoraciones: any[]): number {
    if (!valoraciones || valoraciones.length === 0) return 0;
    const suma = valoraciones.reduce((acc, val) => acc + val.calificacion, 0);
    return Math.round(suma / valoraciones.length);
  }

  private tieneDescuentoActivo(descuentos: any[]): boolean {
    if (!descuentos) return false;
    const ahora = new Date();
    return descuentos.some(d =>
      d.activo &&
      new Date(d.fecha_inicio) <= ahora &&
      new Date(d.fecha_fin) >= ahora
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error en servicio productos:', error);
    return throwError(() => new Error('Error al cargar los productos. Intente nuevamente.'));
  }
}
