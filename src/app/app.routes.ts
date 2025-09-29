import { Routes } from '@angular/router';
import { BodegasComponent } from './pages/bodegas/bodegas';
import { InicioComponent } from './pages/inicio/inicio'; // Asegúrate de tener este componente

export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'bodegas', component: BodegasComponent },
  { path: '', loadComponent: () => import('./pages/inicio/inicio').then(m => m.InicioComponent) },
  { path: 'catalogo', loadComponent: () => import('./pages/catalogo/catalogo').then(m => m.CatalogoComponent) },
  { path: 'bodegas', loadComponent: () => import('./pages/bodegas/bodegas').then(m => m.BodegasComponent) },
  { path: 'contacto', loadComponent: () => import('./pages/contacto/contacto').then(m => m.ContactoComponent) },
  { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.LoginComponent) },
  { path: '**', redirectTo: '' }
];
