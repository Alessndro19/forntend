import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bodega } from '../../interfaces/bodega';

@Injectable({
  providedIn: 'root'
})
export class BodegasService {
  private apiUrl = 'http://localhost:8080/api/bodegas';

  constructor(private http: HttpClient) { }

  getBodegas(): Observable<Bodega[]> {
    return this.http.get<Bodega[]>(this.apiUrl);
  }

  getBodega(id: number): Observable<Bodega> {
    return this.http.get<Bodega>(`${this.apiUrl}/${id}`);
  }

  createBodega(bodega: Bodega): Observable<Bodega> {
    return this.http.post<Bodega>(this.apiUrl, bodega);
  }

  updateBodega(id: number, bodega: Bodega): Observable<Bodega> {
    return this.http.put<Bodega>(`${this.apiUrl}/${id}`, bodega);
  }

  deleteBodega(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
