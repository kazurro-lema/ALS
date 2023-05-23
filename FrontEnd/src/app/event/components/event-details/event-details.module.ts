import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/settings/shared.module';
import { MaterialModule } from 'src/app/settings/material.module';

import { EventDetailsComponent } from './event-details.component';
import { EventDetailsRoutingModule } from './event-details-routing.module';

@NgModule({
  imports: [SharedModule, MaterialModule, EventDetailsRoutingModule],
  declarations: [EventDetailsComponent],
  exports: [EventDetailsComponent]
})
export class EventDetailsModule {}

