import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonContent,
  IonButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonRouterLink
} from '@ionic/angular/standalone';

import { RouterModule } from '@angular/router';  // ⭐ IMPORTANTÍSIMO

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  imports: [
    CommonModule,

    // ⭐ ESTO HACE QUE routerLink FUNCIONE
    RouterModule,

    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonIcon,
    IonButton,
    IonRouterLink
  ]
})
export class WelcomePage implements OnInit {

  constructor() {}

  ngOnInit() {}
}
