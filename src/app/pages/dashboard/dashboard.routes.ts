// src/app/pages/dashboard/dashboard.routes.ts

import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard.page').then((m) => m.DashboardPage),
  },
  {
    path: 'pasteleria',
    loadComponent: () =>
      import('./pasteleria/pasteleria.page').then(
        (m) => m.PasteleriaPage
      ),
  },
  {
    path: 'subir-pasteles',
    loadComponent: () =>
      import('./subir-pasteles/subir-pasteles.page').then(
        (m) => m.SubirPastelesPage
      ),
  },
 
];
