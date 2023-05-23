import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { DeviceService } from '../services/devices.service';
import { device } from '../settings/config/device.config';

@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss'],
  animations: [
    trigger('toggleSearchButtons', [
      state('hidden', style({ opacity: 0, display: 'none' })),
      transition('hidden => visible', animate('0.4s 1s ease'))
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit, OnDestroy {

  device = device;
  classResolution: string;
  isMobile: boolean;
  isExpanded = false;

  @ViewChild('navigation')
  public sidenav: MatSidenav;

  private subscription: Subscription = new Subscription();
  private modeChanged = new Subject();

  constructor(
    public router: Router,
    private deviceService: DeviceService,
  ) {
    this.modeChanged
      .asObservable()
      .pipe(debounceTime(600))
      .subscribe(() => window.dispatchEvent(new Event('resize')));
  }

  ngOnInit() {
    this.subscription = this.deviceService.getResolution().subscribe((classResolution: string) => {
      this.classResolution = classResolution;
      this.isMobile = (classResolution === device.mobile);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  toggleSidenav() {
    if (this.isMobile) {
     this.sidenav.toggle();
      this.modeChanged.next(this.sidenav.opened);
    } else {
      this.isExpanded = !this.isExpanded;
    }
}
}
