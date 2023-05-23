import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { TranslationService } from '../../../services/translation.service';
import { Subscription } from 'rxjs';
import { device } from '../../../settings/config/device.config';
import { DeviceService } from '../../../services/devices.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleSidenav = new EventEmitter<any>();

  public classResolution;
  public device = device;
  public actions: any;
  public language: string;

  private subscription: Subscription = new Subscription();

  constructor(
    private translationService: TranslationService,
    private deviceService: DeviceService
  ) {
    this.language = this.translationService.getLang();
  }

  ngOnInit() {
    this.subscription = this.deviceService
      .getResolution()
      .subscribe((classResolution: string) => {
        this.classResolution = classResolution;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleSideNav() {
    this.toggleSidenav.emit();
  }

  changeLang() {
    this.language = this.language != 'en' ? 'en' : 'es';
    this.translationService.setLang(this.language);
  }
}
