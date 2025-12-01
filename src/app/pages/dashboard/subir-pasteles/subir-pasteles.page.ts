import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Ionic Standalone Components
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
    IonIcon
} from '@ionic/angular/standalone';
import { ImgBBService } from 'src/app/services/imgbb';
import { PastelesService } from 'src/app/services/pasteles';


@Component({
  selector: 'app-subir-pasteles',
  templateUrl: './subir-pasteles.page.html',
  styleUrls: ['./subir-pasteles.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
      IonIcon
  ]
})
export class SubirPastelesPage implements OnInit {

  nombre = '';
  precio: number | null = null;
  sabor = '';
  stock: number | null = null;

  imagenFile: File | null = null;
  imagenPreview: string | null = null;

  pasteles: any[] = [];

  cargando = false;

  constructor(
    private pastelesService: PastelesService,
    private imgbbService: ImgBBService
  ) {}

  ngOnInit() {
    this.pastelesService.getPasteles().subscribe(data => {
      this.pasteles = data;
    });
  }

  seleccionarImagen(event: any) {
    this.imagenFile = event.target.files[0];

    if (!this.imagenFile) return;

    const reader = new FileReader();
    reader.onload = e => this.imagenPreview = reader.result as string;
    reader.readAsDataURL(this.imagenFile);
  }

  async crearPastel() {
    if (!this.nombre || !this.precio || !this.sabor || !this.stock || !this.imagenFile) {
      alert("Completa todos los campos");
      return;
    }

    this.cargando = true;

    try {
      // 1. Subir imagen a ImgBB
      const res: any = await this.imgbbService.subirImagen(this.imagenFile).toPromise();
      const urlImagen = res.data.url;

      // 2. Guardar el pastel en Firestore
      await this.pastelesService.createPastel({
        nombre: this.nombre,
        precio: this.precio,
        sabor: this.sabor,
        stock: this.stock,
        imagen: urlImagen
      });

      // Reset de formulario
      this.nombre = '';
      this.precio = null;
      this.sabor = '';
      this.stock = null;
      this.imagenFile = null;
      this.imagenPreview = null;

      alert("Pastel creado correctamente");

    } catch (e) {
      console.error(e);
      alert("Error al crear el pastel");
    }

    this.cargando = false;
  }

  async editarStock(pastel: any) {
    const nuevo = prompt("Nuevo stock", pastel.stock);

    if (nuevo !== null && nuevo !== '' && Number(nuevo) >= 0) {
      await this.pastelesService.updateStock(pastel.id, Number(nuevo));
    }
  }

  async eliminarPastel(id: string) {
    if (confirm("¿Seguro que deseas eliminar este pastel?")) {
      await this.pastelesService.deletePastel(id);
    }
  }
}
