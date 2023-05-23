import { NgModule } from "@angular/core";
import { SharedModule } from "../settings/shared.module";
import { EventModule } from "../../app/event/event.module"

import { MyEventsRoutingModule } from "./my-events-routing.module";
import { MyEventsComponent } from "./my-events.component";
import { OverviewComponent } from "./components/overview/overview.component";
import { TitleComponent } from "./components/title/title.component";

@NgModule({
  declarations: [MyEventsComponent, OverviewComponent, TitleComponent],
  imports: [SharedModule, MyEventsRoutingModule, EventModule],
  exports: [MyEventsComponent],
})
export class MyEventsModule {}
