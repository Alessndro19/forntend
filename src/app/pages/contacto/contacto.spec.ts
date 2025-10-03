// src/app/contact/contact.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

import { ContactComponent } from './contacto';
import { ContactService } from '../../services/contacto';
import { Contacto } from '../../../interfaces/contacto';

// Mock completo del form data
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

class MockContactService {
  sendContactForm = jasmine.createSpy('sendContactForm').and.returnValue(of({ success: true }));
}

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let contactService: ContactService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        ContactComponent
      ],
      providers: [
        { provide: ContactService, useClass: MockContactService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    contactService = TestBed.inject(ContactService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service on valid form submission', () => {
    // Configurar form válido usando el mock completo
    component.contactForm.setValue(mockFormData);

    component.onSubmit();

    expect(contactService.sendContactForm).toHaveBeenCalledWith(mockFormData);
    expect(component.submitting).toBeTrue();
  });

  it('should handle form submission success', () => {
    component.contactForm.setValue(mockFormData);
    component.onSubmit();

    expect(component.submitSuccess).toBeTrue();
    expect(component.submitting).toBeFalse();
  });

  it('should validate email format', () => {
    const emailControl = component.contactForm.get('correo');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBeFalsy();
    expect(emailControl?.errors?.['email']).toBeTruthy();
  });
});
