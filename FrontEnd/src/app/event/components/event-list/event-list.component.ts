import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceService } from '../../../services/devices.service';
import { IEvent } from '../../../settings/models/event.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy {

  @Input() eventsCount = 0;
  @Input() events: IEvent[] = Array<IEvent>();

  @Output() eventRemoved = new EventEmitter<void>();

  public subscription: Subscription = new Subscription();
  public classResolution: string;
  public hoveredIndex = null;
  public menuOpenedIndex = null;

  constructor(
    private router: Router,
    private deviceService: DeviceService
  ) {}

  ngOnInit() {

    this.subscription = this.deviceService
      .getResolution()
      .subscribe((classResolution: string) => (this.classResolution = classResolution));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showHoverEffect(index: any) {
    return this.hoveredIndex === index || this.menuOpenedIndex === index;
  }

  openEventDetails(event: IEvent) {
    this.router.navigate(['./event/details'], {
      queryParamsHandling: 'merge',
      queryParams: { eventId: event.id }
    });
  }

  public deleteEvent(){

    this.eventRemoved.emit();
  }
}
