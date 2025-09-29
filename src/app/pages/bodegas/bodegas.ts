import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BodegasService } from '../../services/bodegas';
import { Bodega } from '../../../interfaces/bodega';

@Component({
  selector: 'app-bodegas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bodegas.html',
  styleUrls: ['./bodegas.css']
})
export class BodegasComponent implements OnInit {
  bodegas: Bodega[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(private bodegasService: BodegasService) {}

  ngOnInit(): void {
    this.cargarBodegas();
  }

  cargarBodegas(): void {
    this.loading = true;
    this.bodegasService.getBodegas().subscribe({
      next: (bodegas: Bodega[]) => {
        this.bodegas = bodegas;
        this.loading = false;
        console.log('Bodegas cargadas:', bodegas);
      },
      error: (error: any) => {
        console.error('Error al cargar bodegas:', error);
        this.error = 'Error al cargar las bodegas. Verifica que el backend esté corriendo.';
        this.loading = false;
      }
    });
  }
}
