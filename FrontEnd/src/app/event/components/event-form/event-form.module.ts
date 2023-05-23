import { NgModule } from '@angular/core';

import { EventFormRoutingModule } from './event-form-routing.module';
import { EventFormComponent } from './event-form.component';
import { SharedModule } from 'src/app/settings/shared.module';
import { MaterialModule } from 'src/app/settings/material.module';

@NgModule({
  imports: [SharedModule, MaterialModule, EventFormRoutingModule],
  declarations: [EventFormComponent],
  exports: [EventFormComponent],
})
export class EventFormModule {}
