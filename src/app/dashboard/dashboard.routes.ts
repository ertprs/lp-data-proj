import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AuthGuardService } from '../guards/auth-guard.service';

export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent },
    ]
  }
];