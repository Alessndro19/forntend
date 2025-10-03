import { Routes } from '@angular/router';
import { BodegasComponent } from './pages/bodegas/bodegas';
import { InicioComponent } from './pages/inicio/inicio';
import { CatalogoComponent } from './pages/catalogo/catalogo';
import { ContactComponent } from './pages/contacto/contacto';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';

export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'bodegas', component: BodegasComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'contacto', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', loadComponent: () => import('./auth/login/login').then(m => m.LoginComponent)},
  { path: 'register', loadComponent: () => import('./auth/register/register').then(m => m.RegisterComponent)},
  { path: '', loadComponent: () => import('./pages/inicio/inicio').then(m => m.InicioComponent) },
  { path: 'catalogo', loadComponent: () => import('./pages/catalogo/catalogo').then(m => m.CatalogoComponent) },
  { path: 'bodegas', loadComponent: () => import('./pages/bodegas/bodegas').then(m => m.BodegasComponent) },
  { path: 'contacto', loadComponent: () => import('./pages/contacto/contacto').then(m => m.ContactComponent) },
  { path: '**', redirectTo: '' }
];
