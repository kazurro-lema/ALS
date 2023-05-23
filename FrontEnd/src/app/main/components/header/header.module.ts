import { NgModule } from "@angular/core";
import { MaterialModule } from "../../../settings/material.module";
import { SharedModule } from "../../../settings/shared.module";
import { HeaderComponent } from "./header.component";

@NgModule({
  imports: [SharedModule, MaterialModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class HeaderModule {}
