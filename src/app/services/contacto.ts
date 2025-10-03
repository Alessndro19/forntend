// contact.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Contacto {
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  nombre_bodega: string;
  ciudad: string;
  direccion: string;
  mensaje: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:8080/api/contactos';

  constructor(private http: HttpClient) { }

  sendContactForm(data: Contacto): Observable<any> {
    return this.http.post(this.apiUrl, FormData);
  }
}
