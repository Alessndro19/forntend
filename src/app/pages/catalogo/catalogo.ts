import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { ProductosService } from '../../services/productos';
import { Producto, Filtros } from '../../../interfaces/producto';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css']
})
export class CatalogoComponent implements OnInit, OnDestroy {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  productosMasVendidos: Producto[] = [];
  loading: boolean = true;
  error: string = '';

  // Búsqueda con debounce
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  // Filtros mejorados
  filtros: Filtros = {
    categoria: 'todos',
    precio: 'todos',
    marca: 'todos',
    tipoUva: 'todos',
    search: '',
    ordenar: 'nombre',
    bodega: 'todos'
  };

  // Opciones de filtros (ahora dinámicas)
  categorias: string[] = [];
  precios = ['todos', 'Hasta S/ 50', 'S/ 50 - S/ 100', 'S/ 100 - S/ 200', 'Más de S/ 200'];
  marcas: string[] = [];
  tiposUva: string[] = [];
  bodegas: string[] = [];

  // Opciones de ordenamiento
  opcionesOrden = [
    { valor: 'nombre', texto: 'Nombre A-Z' },
    { valor: 'precio_asc', texto: 'Precio: Menor a Mayor' },
    { valor: 'precio_desc', texto: 'Precio: Mayor a Menor' },
    { valor: 'calificacion', texto: 'Mejor Calificados' },
    { valor: 'mas_vendidos', texto: 'Más Vendidos' }
  ];

  // Paginación
  paginaActual: number = 1;
  productosPorPagina: number = 12;
  totalPaginas: number = 1;
  totalProductos: number = 0;

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.configurarBusqueda();
    this.cargarProductos();
    this.cargarProductosMasVendidos();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private configurarBusqueda(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(searchTerm => {
      this.filtros.search = searchTerm;
      this.aplicarFiltros();
    });
  }

  cargarProductos(): void {
    this.loading = true;
    this.productosService.getProductos().subscribe({
      next: (productos: Producto[]) => {
        this.productos = productos;
        this.productosFiltrados = productos;
        this.extraerOpcionesFiltros();
        this.calcularPaginacion();
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error al cargar productos:', error);
        this.error = 'Error al cargar los productos.';
        this.loading = false;
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

  private extraerOpcionesFiltros(): void {
    // Extraer opciones únicas de los productos cargados desde la base de datos
    if (this.productos && this.productos.length > 0) {
      this.categorias = ['todos', ...new Set(this.productos.map(p => p.categoria).filter(Boolean))];
      this.marcas = ['todos', ...new Set(this.productos.map(p => p.marca).filter(Boolean))];
      this.tiposUva = ['todos', ...new Set(this.productos.map(p => p.tipoUva).filter((v): v is string => Boolean(v)))];
      this.bodegas = ['todos', ...new Set(this.productos.map(p => p.bodega).filter(Boolean))];
    }
  }

  onSearchInput(event: any): void {
    this.searchSubject.next(event.target.value);
  }

  aplicarFiltros(): void {
    let productosFiltrados = [...this.productos];

    // Aplicar todos los filtros
    productosFiltrados = productosFiltrados.filter(producto => {
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

      // Filtro por bodega
      if (this.filtros.bodega !== 'todos' && producto.bodega !== this.filtros.bodega) {
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

    // Ordenar productos
    productosFiltrados = this.ordenarProductos(productosFiltrados);

    this.productosFiltrados = productosFiltrados;
    this.calcularPaginacion();
  }

  private ordenarProductos(productos: Producto[]): Producto[] {
    switch (this.filtros.ordenar) {
      case 'precio_asc':
        return productos.sort((a, b) => a.precio - b.precio);
      case 'precio_desc':
        return productos.sort((a, b) => b.precio - a.precio);
      case 'calificacion':
        return productos.sort((a, b) => (b.calificacion || 0) - (a.calificacion || 0));
      case 'mas_vendidos':
        // Ordenar por stock (como proxy de más vendidos)
        return productos.sort((a, b) => b.stock - a.stock);
      case 'nombre':
      default:
        return productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }
  }

  limpiarFiltros(): void {
    this.filtros = {
      categoria: 'todos',
      precio: 'todos',
      marca: 'todos',
      tipoUva: 'todos',
      search: '',
      ordenar: 'nombre',
      bodega: 'todos'
    };
    this.paginaActual = 1;
    this.productosFiltrados = this.productos;
    this.calcularPaginacion();
  }

  cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  get productosPaginados(): Producto[] {
    const inicio = (this.paginaActual - 1) * this.productosPorPagina;
    const fin = inicio + this.productosPorPagina;
    return this.productosFiltrados.slice(inicio, fin);
  }

  private calcularPaginacion(): void {
    this.totalProductos = this.productosFiltrados.length;
    this.totalPaginas = Math.ceil(this.totalProductos / this.productosPorPagina);
    if (this.paginaActual > this.totalPaginas && this.totalPaginas > 0) {
      this.paginaActual = 1;
    }
  }

  generarEstrellas(calificacion: number = 0): number[] {
    return Array(5).fill(0).map((_, index) => index < calificacion ? 1 : 0);
  }

  calcularDescuento(producto: Producto): number {
    if (producto.enOferta && producto.precioOriginal && producto.precioOriginal > producto.precio) {
      return Math.round(((producto.precioOriginal - producto.precio) / producto.precioOriginal) * 100);
    }
    return 0;
  }
}
