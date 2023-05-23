import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/settings/material.module';
import { SharedModule } from 'src/app/settings/shared.module';

import { EventInscriptionRoutingModule } from './event-inscription-routing.module';
import { EventInscriptionComponent } from './event-inscription.component';

@NgModule({
  imports: [SharedModule, MaterialModule, EventInscriptionRoutingModule],
  declarations: [EventInscriptionComponent],
  exports: [EventInscriptionComponent],
})
export class EventInscriptionModule {}
