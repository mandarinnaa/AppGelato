import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenu,
  IonTitle,
  IonMenuButton,
  IonItem,
  IonLabel,
  IonList,
  IonIcon
} from '@ionic/angular/standalone';

import { RouterModule, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { signOut } from 'firebase/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  imports: [
    CommonModule,
    RouterModule,
    IonMenu,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonItem,
    IonList,
    IonLabel,
    IonTitle,
    IonIcon   
  ]
})
export class DashboardPage {

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  logout() {
    signOut(this.auth).then(() => {
      this.router.navigateByUrl('/welcome', { replaceUrl: true });
    });
  }
}
