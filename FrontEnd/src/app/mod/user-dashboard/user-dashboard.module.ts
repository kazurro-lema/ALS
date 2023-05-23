import { NgModule } from "@angular/core";
import { SharedModule } from "../../settings/shared.module";
import { UserModule } from "../../user/user.module"

import { UserDashboardRoutingModule } from "./user-dashboard-routing.module";
import { UserDashboardComponent } from "./user-dashboard.component";
import { OverviewComponent } from "./components/overview/overview.component";
import { TitleComponent } from "./components/title/title.component";

@NgModule({
  declarations: [UserDashboardComponent, OverviewComponent, TitleComponent],
  imports: [SharedModule, UserDashboardRoutingModule, UserModule],
  exports: [UserDashboardComponent],
})
export class UserDashboardModule {}
