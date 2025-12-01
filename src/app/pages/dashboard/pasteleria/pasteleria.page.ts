import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonButton,
  IonIcon,
  ToastController
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

import { PastelesService } from 'src/app/services/pasteles';
import { TicketService } from 'src/app/services/ticket';
import { CarritoService } from 'src/app/services/carrito';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pasteleria',
  templateUrl: './pasteleria.page.html',
  styleUrls: ['./pasteleria.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonButton,
    IonIcon
  ]
})
export class PasteleriaPage implements OnInit, OnDestroy, AfterViewInit {

  pasteles: any[] = [];
  carrito: any[] = [];
  total: number = 0;

  paypalLoaded = false;
  private carritoSub: any;

  constructor(
    private pastelesService: PastelesService,
    private carritoService: CarritoService,
    private ticketService: TicketService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    // Cargar pasteles
    this.pastelesService.getPasteles().subscribe((data: any) => {
      this.pasteles = data.map((p: any) => ({ ...p }));
    });

    // Carrito
    this.carritoSub = this.carritoService.carrito$.subscribe(items => {
      this.carrito = items;
      this.calcularTotal();
      this.renderPaypalButton();
    });

    this.carrito = this.carritoService.getCarrito();
    this.calcularTotal();
  }

  ngAfterViewInit() {
    setTimeout(() => this.inicializarPaypal(), 1000);
  }

  ngOnDestroy() {
    this.carritoSub?.unsubscribe();
  }

  agregarAlCarrito(pastel: any) {
    if (pastel.stock <= 0) return;

    pastel.stock -= 1;
    if (pastel.id) {
      this.pastelesService.updateStock(pastel.id, pastel.stock);
    }

    const producto = {
      id: pastel.id,
      nombre: pastel.nombre,
      precio: Number(pastel.precio),
      cantidad: 1
    };

    this.carritoService.agregarProducto(producto);
  }

  eliminarDelCarrito(i: number) {
    const item = this.carrito[i];
    if (!item) return;

    const encontrado = this.pasteles.find(p => p.nombre === item.nombre);
    if (encontrado) {
      encontrado.stock += 1;
      if (encontrado.id) {
        this.pastelesService.updateStock(encontrado.id, encontrado.stock);
      }
    }

    this.carritoService.eliminarProducto(i);
  }

  calcularTotal() {
    this.total = this.carrito.reduce(
      (sum, it) => sum + (it.precio * it.cantidad),
      0
    );
  }

  async inicializarPaypal() {
    if (this.paypalLoaded) return;

    await this.loadPaypalScript();
    this.paypalLoaded = true;
    this.renderPaypalButton();
  }

  loadPaypalScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).paypal) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src =
        `https://www.paypal.com/sdk/js?client-id=${environment.paypalClientId}&currency=USD`;

      script.onload = () => resolve();
      script.onerror = () => reject('Error al cargar PayPal SDK');

      document.body.appendChild(script);
    });
  }

  renderPaypalButton() {
    const cont = document.getElementById('paypal-button-container');
    if (!cont || this.total <= 0) return;

    cont.innerHTML = '';

    const paypal = (window as any).paypal;
    if (!paypal) return;

    paypal.Buttons({
      createOrder: (_: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.total.toFixed(2),
              currency_code: 'USD'
            }
          }]
        });
      },

      onApprove: async (_: any, actions: any) => {
        const details = await actions.order.capture();

        await this.ticketService.generarTicket(
          this.carrito,
          this.total,
          'Pago con PayPal'
        );

        this.carritoService.limpiarCarrito();
        this.total = 0;
        this.renderPaypalButton();

        const toast = await this.toastController.create({
          message: `¡Gracias por tu compra ${details.payer.name.given_name}!`,
          duration: 2000,
          color: 'success'
        });
        toast.present();
      }
    }).render('#paypal-button-container');
  }


  async pagarEfectivo() {
    await this.ticketService.generarTicket(
      this.carrito,
      this.total,
      'Pago en efectivo'
    );

    this.carritoService.limpiarCarrito();
    this.total = 0;

    const t = await this.toastController.create({
      message: 'Pago en efectivo registrado.',
      duration: 1500,
      color: 'success'
    });
    t.present();
  }
}
