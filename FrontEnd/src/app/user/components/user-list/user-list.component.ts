import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceService } from '../../../services/devices.service';
import { IUser } from '../../../settings/models/user.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  @Input() usersCount = 0;
  @Input() users: IUser[] = Array<IUser>();

  @Output() userRemoved = new EventEmitter<void>();

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

  openUserDetails(user: IUser) {
    /*this.router.navigate(['./user/details'], {
      queryParamsHandling: 'merge',
      queryParams: { userId: user.name }
    });*/
  }

  public deleteUser(){

    this.userRemoved.emit();
  }
}
