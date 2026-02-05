import { Routes } from '@angular/router';
import { DsComponent } from '@layout/ds/ds.component';
import { dsRoutes } from '@layout/ds/ds.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'ds',
    pathMatch: 'full',
  },
  {
    path: 'ds',
    component: DsComponent,
    children: dsRoutes,
  },
];
