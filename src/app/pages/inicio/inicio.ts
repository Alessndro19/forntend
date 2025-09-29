import { Component } from '@angular/core';
import { CommonModule, NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css']
})
export class InicioComponent {
  // Imágenes del slider (usa URLs reales cuando tengas)
  banners = [
    'https://images.unsplash.com/photo-1542367597-8849eb70072f?q=80&w=1600',
    'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1600',
    'https://images.unsplash.com/photo-1514361892635-6b07e31e75ec?q=80&w=1600'
  ];

  testimonios = [
    { nombre: 'Carlos Pérez', empresa: 'Bodega Andina', texto: 'Excelente variedad de vinos y piscos.', avatar: 'https://i.pravatar.cc/80?img=11', rating: 5 },
    { nombre: 'María López', empresa: 'Viña del Sol', texto: 'La plataforma me ayudó a conectar con nuevos clientes.', avatar: 'https://i.pravatar.cc/80?img=32', rating: 4 },
    { nombre: 'José Ramírez', empresa: 'Pisco Premium', texto: 'Muy fácil de usar y con productos de gran calidad.', avatar: 'https://i.pravatar.cc/80?img=25', rating: 5 },
    { nombre: 'Laura P.', empresa: 'Bodega Ica Alianza', texto: '¡Los vinos de Bodegas Ica Alianza son excepcionales!', avatar: 'https://i.pravatar.cc/80?img=50', rating: 5 },
    { nombre: 'Roberto G.', empresa: 'Pisco Acholado', texto: 'La calidad es inigualable y el sabor, exquisito.', avatar: 'https://i.pravatar.cc/80?img=33', rating: 4 },
    { nombre: 'Sofía M.', empresa: 'Vinos del Sur', texto: 'El servicio al cliente es tan bueno como sus productos.', avatar: 'https://i.pravatar.cc/80?img=45', rating: 5 }
  ];


  stars = [1, 2, 3, 4, 5];
}
