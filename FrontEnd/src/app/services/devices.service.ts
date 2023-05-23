import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { device } from '../settings/config/device.config';

@Injectable({
    providedIn: 'root'
  })
  export class DeviceService {
    classResolutionSubject = new BehaviorSubject<string>('');
  
    constructor(private breakpointObserver: BreakpointObserver) {
      this.breakpointObserver
        .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
        .pipe(distinctUntilChanged())
        .subscribe((result) => {
          if (result.matches) {
            this.setResolution(device.mobile);
          } else {
            this.setResolution(device.desktop);
          }
        });
    }
  
    getResolution() {
      return this.classResolutionSubject.asObservable();
    }
  
    setResolution(classResolution: string) {
      this.classResolutionSubject.next(classResolution);
    }
  }
  