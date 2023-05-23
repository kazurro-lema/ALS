import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../../services/user.service';
import { DeviceService } from 'src/app/services/devices.service';
import { IUser } from '../../../../settings/models/user.interface';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'user-actions',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.scss']
})
export class UserActionsComponent implements OnInit, OnDestroy {

  @Input() user: IUser;

  @Output() menuOpened = new EventEmitter<void>();
  @Output() menuClosed = new EventEmitter<void>();
  @Output() userRemoved = new EventEmitter<void>();

  public subscription: Subscription = new Subscription();
  public classResolution: string;

  constructor(
    public dialog: MatDialog,
    private deviceService: DeviceService,
    private userService: UserService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private translate: TranslateService
  ) {}

  ngOnInit() {

    this.subscription = this.deviceService
    .getResolution()
    .subscribe((classResolution: string) => (this.classResolution = classResolution));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  menuOpen(){
    this.menuOpened.emit();
  }

  menuClose(){
    this.menuClosed.emit();
  }

  preventPropagation(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  /*public deleteUser(id: string){

    this.userService.deleteUser(id).subscribe(
      () => {
        this.userRemoved.emit();
        this.toastrService.success(this.translate.instant('COMPONENT.TOAST.DELETED_SUCCESSFULLY'));
      },
      (error) => {
        this.toastrService.error(this.translate.instant('COMPONENT.TOAST.DELETED_INCORRECT'));
      }
    );
  }*/
}
