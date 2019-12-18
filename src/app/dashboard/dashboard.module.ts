import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { RouterModule } from "@angular/router";
import { ChartsModule } from "ng2-charts";
import { MatButtonToggleModule, MatNativeDateModule } from "@angular/material";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatExpansionModule } from "@angular/material/expansion";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatRadioModule } from "@angular/material/radio";

import { LayoutComponent } from "./layout/layout.component";
import { EngHistComponent } from "./layout/eng-hist/eng-hist.component";
import { MsgIntHistComponent } from "./layout/msg-int-hist/msg-int-hist.component";
import { UtilityBarComponent } from "./layout/utility-bar/utility-bar.component";
import { MsgIntQueryComponent } from "./layout/utility-bar/msg-int-query/msg-int-query.component";
import { EngHistQueryComponent } from "./layout/utility-bar/eng-hist-query/eng-hist-query.component";

import { dashboardRoutes } from "./dashboard.routes";

import { AuthGuardService } from "../guards/auth-guard.service";

@NgModule({
  declarations: [
    LayoutComponent,
    EngHistComponent,
    MsgIntHistComponent,
    UtilityBarComponent,
    MsgIntQueryComponent,
    EngHistQueryComponent
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
    MatSidenavModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuardService]
})
export class DashboardModule {}
