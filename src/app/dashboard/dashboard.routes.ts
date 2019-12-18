import { Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";
import { AuthGuardService } from "../guards/auth-guard.service";

export const dashboardRoutes: Routes = [
  {
    path: "dashboard/:apiType",
    component: LayoutComponent,
    canActivate: [AuthGuardService],
    children: [{ path: "**", component: PageNotFoundComponent }]
  },
  {
    path: "dashboard",
    redirectTo: "/dashboard/engagement-history",
    canActivate: [AuthGuardService]
  }
];
