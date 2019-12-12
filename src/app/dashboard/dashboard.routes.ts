import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AuthGuardService } from '../guards/auth-guard.service';
import { MsgIntHistComponent } from './layout/msg-int-hist/msg-int-hist.component';
import { EngHistComponent } from './layout/eng-hist/eng-hist.component';

export const dashboardRoutes: Routes = [
  {
    path: 'dashboard/:apiType',
    component: LayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      // { path: 'historical-data/:apiType', component: LayoutComponent },
      // { path: 'engagement-history', component: LayoutComponent },
      { path: '', redirectTo: '/dashboard/engagement-history', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent },
    ]
  }
];