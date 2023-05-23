import { NgModule } from "@angular/core";
import { SharedModule } from "../../settings/shared.module";
import { EventModule } from "../../../app/event/event.module"

import { EventDashboardRoutingModule } from "./event-dashboard-routing.module";
import { EventDashboardComponent } from "./event-dashboard.component";
import { OverviewComponent } from "./components/overview/overview.component";
import { TitleComponent } from "./components/title/title.component";

@NgModule({
  declarations: [EventDashboardComponent, OverviewComponent, TitleComponent],
  imports: [SharedModule, EventDashboardRoutingModule, EventModule],
  exports: [EventDashboardComponent],
})
export class EventDashboardModule {}
