import { Routes } from '@angular/router';
import { ShellComponent } from '@layout/shell/shell.component';
import { DsComponent } from '@layout/ds/ds.component';
import { dsRoutes } from '@layout/ds/ds.routes';
import { LandingShowcaseComponent } from '@showcase/landing/landing.showcase.component';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: '', component: LandingShowcaseComponent },
      { path: 'components', component: DsComponent, children: dsRoutes },
    ],
  },
];
