import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { DeviceService } from '../../services/devices.service';
import { IEvent } from '../../settings/models/event.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'event-dashboard',
  templateUrl: './event-dashboard.component.html',
  styleUrls: ['./event-dashboard.component.scss']
})
export class EventDashboardComponent implements OnInit, OnDestroy {

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

    this.getEventDashboard();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getEventDashboard() {

    this.eventService.getEvents().subscribe((events: IEvent[]) => {

      this.events = events;
      this.eventsCount = events.length;
    });
  }
}
