import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { DeviceService } from "src/app/services/devices.service";
import { IUser } from "src/app/settings/models/user.interface";
import { Subscription } from "rxjs";

@Component({
  selector: "overview",
  templateUrl: "./overview.component.html",
  styleUrls: ["./overview.component.scss"],
})
export class OverviewComponent implements OnInit, OnDestroy {

  @Input() users: IUser[];
  @Input() usersCount = 0;

  @Output() userRemoved = new EventEmitter<void>();

  public classResolution: string;
  private subscription: Subscription = new Subscription();

  constructor(private deviceService: DeviceService) {}

  ngOnInit() {
    this.subscription = this.deviceService
      .getResolution()
      .subscribe(
        (classResolution: string) => (this.classResolution = classResolution)
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public deleteUser(){
    this.userRemoved.emit();
  }
}
