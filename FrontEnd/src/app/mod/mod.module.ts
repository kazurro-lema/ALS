import { NgModule } from "@angular/core";
import { SharedModule } from "../settings/shared.module";

import { ModRoutingModule } from "./mod-routing.module";

@NgModule({
  declarations: [],
  imports: [SharedModule, ModRoutingModule],
  exports: [],
})
export class ModModule {}
