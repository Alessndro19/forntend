// bodegas.component.ts
import { Component, OnInit } from '@angular/core';
import { BodegaService, Bodega } from '../../services/bodegas';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bodegas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bodegas.html',
  styleUrls: ['./bodegas.css']
})
export class BodegasComponent implements OnInit {
  bodegas: Bodega[] = [];
  loading = false;
  error = '';
  currentPage = 0;
  pageSize = 12;
  totalBodegas = 0;
  totalPages = 0;

  constructor(private bodegaService: BodegaService) {}

  ngOnInit() {
    this.loadBodegas();
  }

  // Cargar todas las bodegas (sin paginación)
  loadBodegas() {
    this.loading = true;
    this.error = '';

    this.bodegaService.getBodegas().subscribe({
      next: (bodegas) => {
        this.loading = false;
        this.bodegas = bodegas;
        this.totalBodegas = bodegas.length;
      },
      error: (error) => {
        this.loading = false;
        this.error = this.handleError(error);
        console.error('Error loading bodegas:', error);
      }
    });
  }

  // Cargar bodegas paginadas (opcional)
  loadBodegasPaginadas(page: number = 0) {
    this.loading = true;
    this.error = '';

    this.bodegaService.getBodegasPaginadas(page, this.pageSize).subscribe({
      next: (response) => {
        this.loading = false;
        this.bodegas = response.content;
        this.totalBodegas = response.totalElements;
        this.totalPages = response.totalPages;
        this.currentPage = response.number;
      },
      error: (error) => {
        this.loading = false;
        this.error = this.handleError(error);
      }
    });
  }

  // Buscar bodegas por nombre
  buscarBodegas(nombre: string) {
    if (nombre.trim()) {
      this.loading = true;
      this.bodegaService.buscarBodegasPorNombre(nombre).subscribe({
        next: (response) => {
          this.loading = false;
          this.bodegas = response.content;
          this.totalBodegas = response.totalElements;
        },
        error: (error) => {
          this.loading = false;
          this.error = this.handleError(error);
        }
      });
    } else {
      this.loadBodegas();
    }
  }

  private handleError(error: any): string {
    if (error.status === 0) {
      return 'Error de conexión. Verifica que el backend esté ejecutándose.';
    } else if (error.status === 404) {
      return 'No se encontraron bodegas.';
    } else if (error.status === 500) {
      return 'Error del servidor. Intenta más tarde.';
    } else {
      return error.error?.message || 'Error al cargar las bodegas';
    }
  }

  scrollToBodegas() {
    const element = document.getElementById('bodegas-reales');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Método para formatear fecha
  formatFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-ES');
  }

  // Navegación de páginas
  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.loadBodegasPaginadas(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.loadBodegasPaginadas(this.currentPage - 1);
    }
  }
}
