import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  menuItems = [
    { path: '/', label: 'Inicio' },
    { path: '/bodegas', label: 'Bodegas' },
    { path: '/catalogo', label: 'Catálogo' },
    { path: '/contacto', label: 'Contacto' }
  ];
}
