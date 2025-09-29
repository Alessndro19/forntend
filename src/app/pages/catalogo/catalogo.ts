import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../services/productos';
import { Producto } from '../../../interfaces/producto';
import { Filtros } from '../../../interfaces/filtros';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css']
})
export class CatalogoComponent implements OnInit {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  productosMasVendidos: Producto[] = [];
  loading: boolean = true;
  error: string = '';

  // Filtros
  filtros: Filtros = {
    categoria: 'todos',
    precio: 'todos',
    marca: 'todos',
    tipoUva: 'todos',
    search: ''
  };

  // Opciones de filtros
  categorias = ['todos', 'Vinos Tintos', 'Vinos Blancos', 'Vinos Rosados', 'Vinos Espumosos', 'Piscos'];
  precios = ['todos', 'Hasta S/ 50', 'S/ 50 - S/ 100', 'S/ 100 - S/ 200', 'Más de S/ 200'];
  marcas = ['todos', 'Ica Alianza', 'Viña Octrojé', 'Tabernero', 'Queirodo'];
  tiposUva = ['todos', 'Malibec', 'Cabernet Sauvignon', 'Italia', 'Quebranta', 'Torontel'];

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarProductosMasVendidos();
  }

  cargarProductos(): void {
    this.loading = true;
    this.productosService.getProductos().subscribe({
      next: (productos: Producto[]) => {
        this.productos = productos;
        this.productosFiltrados = productos;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error al cargar productos:', error);
        this.error = 'Error al cargar los productos.';
        this.loading = false;
        this.cargarDatosEjemplo();
      }
    });
  }

  cargarProductosMasVendidos(): void {
    this.productosService.getProductosMasVendidos().subscribe({
      next: (productos: Producto[]) => {
        this.productosMasVendidos = productos;
      },
      error: (error: any) => {
        console.error('Error al cargar productos más vendidos:', error);
      }
    });
  }

  aplicarFiltros(): void {
    this.productosFiltrados = this.productos.filter(producto => {
      // Filtro por categoría
      if (this.filtros.categoria !== 'todos' && producto.categoria !== this.filtros.categoria) {
        return false;
      }

      // Filtro por precio
      if (this.filtros.precio !== 'todos') {
        const precio = producto.precio;
        switch (this.filtros.precio) {
          case 'Hasta S/ 50':
            if (precio > 50) return false;
            break;
          case 'S/ 50 - S/ 100':
            if (precio < 50 || precio > 100) return false;
            break;
          case 'S/ 100 - S/ 200':
            if (precio < 100 || precio > 200) return false;
            break;
          case 'Más de S/ 200':
            if (precio <= 200) return false;
            break;
        }
      }

      // Filtro por marca
      if (this.filtros.marca !== 'todos' && producto.marca !== this.filtros.marca) {
        return false;
      }

      // Filtro por tipo de uva
      if (this.filtros.tipoUva !== 'todos' && producto.tipoUva !== this.filtros.tipoUva) {
        return false;
      }

      // Filtro por búsqueda
      if (this.filtros.search &&
          !producto.nombre.toLowerCase().includes(this.filtros.search.toLowerCase()) &&
          !producto.descripcion.toLowerCase().includes(this.filtros.search.toLowerCase())) {
        return false;
      }

      return true;
    });
  }

  limpiarFiltros(): void {
    this.filtros = {
      categoria: 'todos',
      precio: 'todos',
      marca: 'todos',
      tipoUva: 'todos',
      search: ''
    };
    this.productosFiltrados = this.productos;
  }

  generarEstrellas(calificacion: number = 0): number[] {
    return Array(5).fill(0).map((_, index) => index < calificacion ? 1 : 0);
  }

  calcularDescuento(producto: Producto): number {
    if (producto.enOferta && producto.precioOriginal) {
      return Math.round(((producto.precioOriginal - producto.precio) / producto.precioOriginal) * 100);
    }
    return 0;
  }

  private cargarDatosEjemplo(): void {
    this.productos = [
      {
        idProducto: 1,
        idBodega: 1,
        nombre: 'Vino Tinto Reserva',
        descripcion: 'Vino tinto reserva con cuerpo y carácter único',
        precio: 120.00,
        precioOriginal: 150.00,
        stock: 25,
        codigoBarras: '1234567890123',
        categoria: 'Vinos Tintos',
        tipoUva: 'Malibec',
        marca: 'Ica Alianza',
        imagenUrl: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        calificacion: 5,
        aniosCosecha: '6:0:0:0 0:48',
        codigo: '6:0:0:0 0:48',
        bodega: 'Alice d\'Oro',
        enOferta: true
      },
      {
        idProducto: 2,
        idBodega: 1,
        nombre: 'Vino Rosado Dulce',
        descripcion: 'Vino rosado dulce con aromas frutales intensos',
        precio: 50.00,
        stock: 40,
        codigoBarras: '1234567890124',
        categoria: 'Vinos Rosados',
        tipoUva: 'Italia',
        marca: 'Ica Alianza',
        imagenUrl: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        calificacion: 4,
        aniosCosecha: 'Años 4 cortes',
        codigo: '0:00:00 (K1)'
      },
      {
        idProducto: 3,
        idBodega: 1,
        nombre: 'Pisco Quebranta',
        descripcion: 'Pisco puro de uva Quebranta, aromático y suave',
        precio: 95.00,
        stock: 30,
        codigoBarras: '1234567890125',
        categoria: 'Piscos',
        tipoUva: 'Quebranta',
        marca: 'Viña Octrojé',
        imagenUrl: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        calificacion: 5,
        aniosCosecha: 'Años 4 cortes',
        codigo: '0:00:00 (K3)',
        enOferta: true
      },
      {
        idProducto: 4,
        idBodega: 1,
        nombre: 'Vino Espumoso Brut',
        descripcion: 'Vino espumoso brut con burbujas finas y persistentes',
        precio: 180.00,
        stock: 15,
        codigoBarras: '1234567890126',
        categoria: 'Vinos Espumosos',
        tipoUva: 'Torontel',
        marca: 'Tabernero',
        imagenUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        calificacion: 4,
        aniosCosecha: 'Años 4 cortes',
        codigo: '0:00:00 (K4)'
      },
      {
        idProducto: 5,
        idBodega: 1,
        nombre: 'Vino Blanco Seco',
        descripcion: 'Vino blanco seco con notas cítricas y frescas',
        precio: 75.00,
        stock: 35,
        codigoBarras: '1234567890127',
        categoria: 'Vinos Blancos',
        tipoUva: 'Torontel',
        marca: 'Queirodo',
        imagenUrl: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        calificacion: 4,
        aniosCosecha: 'Años 3 cortes',
        codigo: '0:00:00 (K2)'
      },
      {
        idProducto: 6,
        idBodega: 1,
        nombre: 'Pisco Acholado',
        descripcion: 'Pisco acholado, blend de uvas aromáticas',
        precio: 89.90,
        stock: 20,
        codigoBarras: '1234567890128',
        categoria: 'Piscos',
        tipoUva: 'Quebranta',
        marca: 'Ica Alianza',
        imagenUrl: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        calificacion: 4,
        aniosCosecha: 'Años 4 cortes',
        codigo: '0:00:00 (K6)'
      }
    ];
    this.productosFiltrados = this.productos;
    this.productosMasVendidos = this.productos.slice(0, 4);
  }
}
