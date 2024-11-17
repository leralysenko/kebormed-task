import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(c => c.DashboardComponent)
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.routes').then(c => c.UsersRoutes)
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.component').then(c => c.SettingsComponent)
  },
];
