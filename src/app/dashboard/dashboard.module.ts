import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { RouterModule } from "@angular/router";
import { ChartsModule } from "ng2-charts";
import { MatButtonToggleModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutComponent } from "./layout/layout.component";
import { EngHistComponent } from "./layout/eng-hist/eng-hist.component";
import { MsgIntHistComponent } from "./layout/msg-int-hist/msg-int-hist.component";

import { dashboardRoutes } from "./dashboard.routes";

import { AuthGuardService } from "../guards/auth-guard.service";

@NgModule({
  declarations: [
    LayoutComponent, 
    EngHistComponent, 
    MsgIntHistComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild(dashboardRoutes),
    MatProgressSpinnerModule,
    ChartsModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  providers: [AuthGuardService]
})
export class DashboardModule {}
