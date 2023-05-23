import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { DeviceService } from '../../services/devices.service';
import { IUser } from '../../settings/models/user.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit, OnDestroy {

  users: IUser[];
  usersCount = 0;

  private subscription: Subscription = new Subscription();
  public classResolution: string;

  constructor(
    private userService: UserService,
    private deviceService: DeviceService
  ) {}

  ngOnInit() {
    this.subscription = this.deviceService
      .getResolution()
      .subscribe((classResolution: string) => (this.classResolution = classResolution));

    this.getUserDashboard();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getUserDashboard() {

    this.userService.getUsers().subscribe((users: IUser[]) => {

      this.users = users;
      this.usersCount = users.length;
    });
  }
}
