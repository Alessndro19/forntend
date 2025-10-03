// src/app/contact/contact.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contacto';
import { Contacto } from './../../../interfaces/contacto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
   standalone: true,  // ← Si es standalone
  imports: [CommonModule, ReactiveFormsModule],  // ← Importa aquí
  templateUrl: './contacto.html',
  styleUrls: ['./contacto.css']
})
export class ContactComponent {
  contactForm: FormGroup;
  submitting = false;
  submitted = false;
  submitSuccess = false;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.contactForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      nombre_bodega: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      mensaje: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.submitting = true;

      // Cast a la interface Contacto
      const formData: Contacto = this.contactForm.value;

      this.contactService.sendContactForm(formData).subscribe({
        next: (response) => {
          this.handleSuccess();
        },
        error: (error) => {
          this.handleError(error);
        }
      });
    } else {
      this.markFormGroupTouched(this.contactForm);
    }
  }

  private handleSuccess(): void {
    this.submitting = false;
    this.submitted = true;
    this.submitSuccess = true;
    this.contactForm.reset();

    setTimeout(() => {
      this.submitted = false;
    }, 5000);
  }

  private handleError(error: any): void {
    this.submitting = false;
    this.submitted = true;
    this.submitSuccess = false;
    console.error('Error al enviar el formulario:', error);
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  // Getters para el template
  get nombre() { return this.contactForm.get('nombre'); }
  get apellido() { return this.contactForm.get('apellido'); }
  get correo() { return this.contactForm.get('correo'); }
  get telefono() { return this.contactForm.get('telefono'); }
  get nombre_bodega() { return this.contactForm.get('nombre_bodega'); }
  get ciudad() { return this.contactForm.get('ciudad'); }
  get direccion() { return this.contactForm.get('direccion'); }
  get mensaje() { return this.contactForm.get('mensaje'); }
}
