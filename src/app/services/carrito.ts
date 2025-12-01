import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private carritoSubject = new BehaviorSubject<any[]>(this.getCarrito());
  carrito$ = this.carritoSubject.asObservable();

  getCarrito(): any[] {
    return JSON.parse(localStorage.getItem('carrito') || '[]');
  }

  agregarProducto(producto: any) {
    const carrito = this.getCarrito();
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    this.carritoSubject.next(carrito);
    window.dispatchEvent(new Event('carritoActualizado'));
  }

  eliminarProducto(index: number) {
    const carrito = this.getCarrito();
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    this.carritoSubject.next(carrito);
    window.dispatchEvent(new Event('carritoActualizado'));
  }

  limpiarCarrito() {
    localStorage.removeItem('carrito');
    this.carritoSubject.next([]);
    window.dispatchEvent(new Event('carritoActualizado'));
  }
}