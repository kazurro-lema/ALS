import { NgModule } from '@angular/core';
import { SharedModule } from '../settings/shared.module';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { EventActionsComponent } from './components/event-list/event-actions/event-actions.component';
import { BanFormComponent } from './components/ban-form/ban-form.component';
@NgModule({
  declarations: [
    EventListComponent,
    EventCardComponent,
    EventActionsComponent,
    BanFormComponent
  ],
  imports: [SharedModule],
  exports: [EventListComponent],
})
export class EventModule {}
