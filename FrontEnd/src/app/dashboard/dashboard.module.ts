import { NgModule } from "@angular/core";
import { SharedModule } from "../settings/shared.module";
import { EventModule } from "../event/event.module"

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { OverviewComponent } from "./components/overview/overview.component";
import { TitleComponent } from "./components/title/title.component";

@NgModule({
  declarations: [DashboardComponent, OverviewComponent, TitleComponent],
  imports: [SharedModule, DashboardRoutingModule, EventModule],
  exports: [DashboardComponent],
})
export class MainDashboardModule {}
