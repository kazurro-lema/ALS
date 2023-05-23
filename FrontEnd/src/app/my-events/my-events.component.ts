import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { DeviceService } from '../services/devices.service';
import { IEvent } from '../settings/models/event.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.scss']
})
export class MyEventsComponent implements OnInit, OnDestroy {

  events: IEvent[];
  eventsCount = 0;

  private subscription: Subscription = new Subscription();
  public classResolution: string;

  constructor(
    private eventService: EventService,
    private deviceService: DeviceService
  ) {}

  ngOnInit() {
    this.subscription = this.deviceService
      .getResolution()
      .subscribe((classResolution: string) => (this.classResolution = classResolution));

    this.getMyEvents();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getMyEvents() {

    this.eventService.getMyEvents().subscribe((events: IEvent[]) => {

      this.events = events;
      this.eventsCount = events.length;
    });
  }
}
