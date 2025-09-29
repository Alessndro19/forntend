import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe, NgFor } from '@angular/common';

type Producto = { id:number; nombre:string; precio:number; rating:number; img?:string };

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, NgFor, CurrencyPipe],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css']
})
export class CatalogoComponent {
  productos: Producto[] = [
    { id:1, nombre:'Pisco Mosto Verde', precio: 99.9, rating: 5 },
    { id:2, nombre:'Vino Tinto Reserva', precio: 79.9, rating: 4 },
    { id:3, nombre:'Pisco Acholado', precio: 59.9, rating: 4 },
    { id:4, nombre:'Vino Blanco Joven', precio: 49.9, rating: 3 },
    { id:5, nombre:'Vino Rosé', precio: 54.9, rating: 4 },
    { id:6, nombre:'Pisco Italia', precio: 89.9, rating: 5 }
  ];

  addToCart(p: Producto) {
    // temporal: luego conectamos con servicio de carrito
    console.log('Agregar', p);
    alert(`Agregado: ${p.nombre}`);
  }
}
