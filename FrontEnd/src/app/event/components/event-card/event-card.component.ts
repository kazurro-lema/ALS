import { Component, Input } from '@angular/core';
import { IEvent } from '../../../settings/models/event.interface';


@Component({
  selector: 'event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent {

  @Input() event: IEvent;

  constructor() {}
}
