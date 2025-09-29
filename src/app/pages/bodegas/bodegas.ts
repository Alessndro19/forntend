import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BodegasService } from '../../services/bodegas';
import { Bodega } from '../../../interfaces/bodega';

@Component({
  selector: 'app-bodegas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bodegas.html',
  styleUrls: ['./bodegas.css']
})
export class BodegasComponent implements OnInit {
  bodegas: Bodega[] = [];
  mostrarModal: boolean = false;

  nuevaBodega: Bodega = {
    nombre: '',
    direccion: '',
    propietario: '',
    descripcion: '',
    telefono: '',
    correo: '',
    ubicacionMaps: '',
    imagenLogo: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' // Imagen por defecto
  };

  constructor(private bodegasService: BodegasService) {}

  ngOnInit(): void {
    this.cargarBodegas();
  }

  cargarBodegas(): void {
    this.bodegasService.getBodegas().subscribe({
      next: (bodegas: Bodega[]) => {
        this.bodegas = bodegas;
      },
      error: (error: any) => {
        console.error('Error al cargar bodegas:', error);
      }
    });
  }

  abrirModal(): void {
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.resetFormulario();
  }

  crearBodega(): void {
    this.bodegasService.createBodega(this.nuevaBodega).subscribe({
      next: (bodegaCreada: Bodega) => {
        this.bodegas.push(bodegaCreada);
        this.cerrarModal();
      },
      error: (error: any) => {
        console.error('Error al crear bodega:', error);
      }
    });
  }

  private resetFormulario(): void {
    this.nuevaBodega = {
      nombre: '',
      direccion: '',
      propietario: '',
      descripcion: '',
      telefono: '',
      correo: '',
      ubicacionMaps: '',
      imagenLogo: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    };
  }
}
