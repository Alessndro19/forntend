import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient) { }

  // Obtener todos los productos
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  // Obtener productos con filtros
  getProductosFiltrados(filtros: any): Observable<Producto[]> {
    let params = new HttpParams();

    if (filtros.categoria && filtros.categoria !== 'todos') {
      params = params.set('categoria', filtros.categoria);
    }
    if (filtros.marca && filtros.marca !== 'todos') {
      params = params.set('marca', filtros.marca);
    }
    if (filtros.tipoUva && filtros.tipoUva !== 'todos') {
      params = params.set('tipoUva', filtros.tipoUva);
    }
    if (filtros.search) {
      params = params.set('search', filtros.search);
    }

    return this.http.get<Producto[]>(`${this.apiUrl}/filtrados`, { params });
  }

  // Obtener productos más vendidos
  getProductosMasVendidos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/mas-vendidos`);
  }

  // Obtener productos destacados
  getProductosDestacados(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/destacados`);
  }
}
