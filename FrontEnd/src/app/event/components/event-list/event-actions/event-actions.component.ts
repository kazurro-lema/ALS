import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { EventService } from '../../../../services/event.service';
import { DeviceService } from 'src/app/services/devices.service';
import { IEvent } from '../../../../settings/models/event.interface';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { BanFormComponent } from '../../ban-form/ban-form.component'
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'event-actions',
  templateUrl: './event-actions.component.html',
  styleUrls: ['./event-actions.component.scss']
})
export class EventActionsComponent implements OnInit, OnDestroy {

  @Input() event: IEvent;

  @Output() menuOpened = new EventEmitter<void>();
  @Output() menuClosed = new EventEmitter<void>();
  @Output() eventRemoved = new EventEmitter<void>();
  @Output() eventId = new EventEmitter<Number>();

  public subscription: Subscription = new Subscription();
  public classResolution: string;

  constructor(
    public dialog: Dialog,
    private deviceService: DeviceService,
    private eventService: EventService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private translate: TranslateService,
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

  checkAuthor(){
    const actualUser = this.authService.getUserDetails();

    return this.event.author != actualUser;
  }

  deleteEvent(id: number){

    this.eventService.deleteEvent(id).subscribe(
      () => {
        this.eventRemoved.emit();
        this.toastrService.success(this.translate.instant('COMPONENT.TOAST.DELETED_SUCCESSFULLY'));
      },
      (error) => {
        this.toastrService.error(this.translate.instant('COMPONENT.TOAST.DELETED_INCORRECT'));
      }
    );
  }

  isMod(){
    return this.authService.checkAuthLevel('MOD');
  }

  showBanMenu() {
    const dialogRef = this.dialog.open(BanFormComponent, {
      width: '250px',
      data: this.event,
    });

    dialogRef.closed.subscribe(result => {
      this.eventId.emit();
    });
  }

}
