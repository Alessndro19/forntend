// src/app/auth/register/register.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      // Información Personal
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.pattern('^[0-9+\\-\\s()]{7,20}$')]],

      // Información de la Bodega
      nombre_bodega: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      tipo_bodega: ['particular', [Validators.required]],
      direccion_bodega: ['', [Validators.required]],
      ciudad_bodega: ['', [Validators.required]],

      // Credenciales
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]')
      ]],
      confirmPassword: ['', [Validators.required]],

      // Términos y condiciones
      acceptTerms: [false, [Validators.requiredTrue]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      if (confirmPassword?.errors?.['passwordMismatch']) {
        delete confirmPassword.errors['passwordMismatch'];
        confirmPassword.updateValueAndValidity();
      }
    }
    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      this.successMessage = '';

      // Preparar datos para el backend
      const formData = {
        usuario: {
          nombre: this.registerForm.get('nombre')?.value,
          apellido: this.registerForm.get('apellido')?.value,
          email: this.registerForm.get('email')?.value,
          telefono: this.registerForm.get('telefono')?.value,
          password: this.registerForm.get('password')?.value
        },
        bodega: {
          nombre: this.registerForm.get('nombre_bodega')?.value,
          tipo: this.registerForm.get('tipo_bodega')?.value,
          direccion: this.registerForm.get('direccion_bodega')?.value,
          ciudad: this.registerForm.get('ciudad_bodega')?.value
        }
      };

      console.log('Datos a enviar:', formData);

      // Simular registro exitoso (reemplaza con tu API real)
      this.simulateRegister(formData);

      // Para usar con tu backend real, descomenta esto:
      /*
      this.authService.register(formData).subscribe({
        next: (response) => {
          this.loading = false;
          if (response.success) {
            this.successMessage = '¡Registro exitoso! Redirigiendo...';
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          } else {
            this.errorMessage = response.message || 'Error en el registro';
          }
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = error.error?.message || 'Error de conexión. Intenta nuevamente.';
          console.error('Register error:', error);
        }
      });
      */
    } else {
      this.markFormGroupTouched(this.registerForm);
      this.errorMessage = 'Por favor, completa todos los campos requeridos correctamente.';
    }
  }

  private simulateRegister(formData: any): void {
    setTimeout(() => {
      this.loading = false;
      this.successMessage = '¡Registro exitoso! Serás redirigido al login.';
      console.log('Registro simulado:', formData);

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);
    }, 2000);
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  // Getters para el template
  get nombre() { return this.registerForm.get('nombre'); }
  get apellido() { return this.registerForm.get('apellido'); }
  get email() { return this.registerForm.get('email'); }
  get telefono() { return this.registerForm.get('telefono'); }
  get nombre_bodega() { return this.registerForm.get('nombre_bodega'); }
  get tipo_bodega() { return this.registerForm.get('tipo_bodega'); }
  get direccion_bodega() { return this.registerForm.get('direccion_bodega'); }
  get ciudad_bodega() { return this.registerForm.get('ciudad_bodega'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get acceptTerms() { return this.registerForm.get('acceptTerms'); }
}
