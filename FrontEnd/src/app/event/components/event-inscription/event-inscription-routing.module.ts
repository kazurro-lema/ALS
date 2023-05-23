import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EventInscriptionComponent } from "./event-inscription.component";

const routes: Routes = [
  {
    path: "",
    component: EventInscriptionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventInscriptionRoutingModule {}
