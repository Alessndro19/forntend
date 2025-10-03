// services/bodega.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Bodega {
  idBodega: number;
  nombre: string;
  direccion?: string;
  propietario?: string;
  fechaRegistro?: string;
  descripcion?: string;
  telefono?: string;
  correo?: string;
  ubicacionMaps?: string;
  imagenLogo?: string;
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

@Injectable({
  providedIn: 'root'
})
export class BodegaService {
  private apiUrl = 'http://localhost:8080/api/bodegas'; // Ajusta el puerto según tu backend

  constructor(private http: HttpClient) {}

  // GET todas las bodegas (sin paginación)
  getBodegas(): Observable<Bodega[]> {
    return this.http.get<Bodega[]>(this.apiUrl);
  }

  // GET bodegas paginadas
  getBodegasPaginadas(
    page: number = 0,
    size: number = 10,
    sortBy: string = 'nombre',
    sortDirection: string = 'asc'
  ): Observable<PaginatedResponse<Bodega>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortDirection', sortDirection);

    return this.http.get<PaginatedResponse<Bodega>>(`${this.apiUrl}/paginated`, { params });
  }

  // GET bodega por ID
  getBodegaById(id: number): Observable<Bodega> {
    return this.http.get<Bodega>(`${this.apiUrl}/${id}`);
  }

  // GET búsqueda por nombre
  buscarBodegasPorNombre(
    nombre: string,
    page: number = 0,
    size: number = 10
  ): Observable<PaginatedResponse<Bodega>> {
    let params = new HttpParams()
      .set('nombre', nombre)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PaginatedResponse<Bodega>>(`${this.apiUrl}/buscar`, { params });
  }

  // POST crear bodega
  crearBodega(bodega: Bodega): Observable<Bodega> {
    return this.http.post<Bodega>(this.apiUrl, bodega);
  }

  // PUT actualizar bodega
  actualizarBodega(id: number, bodega: Bodega): Observable<Bodega> {
    return this.http.put<Bodega>(`${this.apiUrl}/${id}`, bodega);
  }

  // DELETE eliminar bodega
  eliminarBodega(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
