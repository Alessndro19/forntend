// src/app/services/contact.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ContactService } from './contacto';
import { Contacto } from '../../interfaces/contacto';

describe('ContactService', () => {
  let service: ContactService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactService]
    });
    service = TestBed.inject(ContactService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send contact form', () => {
    // Mock completo que cumple con la interface Contacto
    const mockFormData: Contacto = {
      nombre: 'Juan',
      apellido: 'Pérez',
      correo: 'juan@example.com',
      telefono: '+123456789',
      nombre_bodega: 'Bodega Test',
      ciudad: 'Mendoza',
      direccion: 'Calle Test 123',
      mensaje: 'Mensaje de prueba'
    };

    const mockResponse = { success: true };

    service.sendContactForm(mockFormData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('https://tu-api.com/contact');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockFormData);
    req.flush(mockResponse);
  });
});
