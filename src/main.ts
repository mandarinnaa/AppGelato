import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { environment } from './environments/environment';

// ICONOS
import { addIcons } from 'ionicons';
import {
  logInOutline,
  personAddOutline,
  arrowBackOutline,
  homeOutline,
  cartOutline,
  iceCreamOutline,
  storefrontOutline,
  cloudUploadOutline,
  receiptOutline,
  logOutOutline,

  // ICONOS NUEVOS DE TU PÁGINA
  createOutline,
  pricetagOutline,
  cubeOutline,
  imagesOutline,
  buildOutline,
  trashOutline,
  chevronBackOutline
} from 'ionicons/icons';

addIcons({
  logInOutline,
  personAddOutline,
  arrowBackOutline,
  homeOutline,
  cartOutline,
  iceCreamOutline,
  storefrontOutline,
  cloudUploadOutline,
  receiptOutline,
  logOutOutline,

  // NUEVOS ICONOS PARA SUBIR PASTELES
  createOutline,
  pricetagOutline,
  cubeOutline,
  imagesOutline,
  buildOutline,
  trashOutline,
  chevronBackOutline,
});

// 🔥 ANGULAR FIRE
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),

    // Firebase
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
});
