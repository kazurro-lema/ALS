import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { EventService } from '../../../services/event.service';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IEvent } from '../../../settings/models/event.interface';

@Component({
  selector: 'event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  eventForm: FormGroup;
  event: IEvent;
  detailsId: number;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private translate: TranslateService
  ) {
  }

  ngOnInit() {
    this.initForm();
    this.activatedRoute.queryParams.subscribe((params: Params) => {

      this.detailsId = params['eventId'];
      this.getEvent();
    });

  }
  initForm() {
    this.eventForm = this.formBuilder.group({
      name: ['', Validators.required],
      desc: ['', Validators.required],
      dateIni: [new Date(), Validators.required],
      dateEnd: [new Date(), Validators.required],
      location: [''],
    });
  }

  getEvent() {
    this.eventService.getEvent(this.detailsId).subscribe(
      (data) => {
        this.event = data;

        const hasEditPermission = this.checkAuthor();


        this.eventForm = this.formBuilder.group({
          name: [{ value: this.event.name, disabled: hasEditPermission }, Validators.required],
          desc: [{ value: this.event.description, disabled: hasEditPermission }],
          dateIni: [{ value: this.event.startDate, disabled: hasEditPermission }, Validators.required],
          dateEnd: [{ value: this.event.endDate, disabled: hasEditPermission }, Validators.required],
          location: [{ value: this.event.location, disabled: hasEditPermission }],

        });
      },
      (error) => {}
    );
  }

  submit() {
    if (this.eventForm.valid) {

      const body = {
        name: this.eventForm.value.name,
        description: this.eventForm.value.desc,
        startDate: this.eventForm.value.dateIni,
        endDate: this.eventForm.value.dateEnd,
        location: this.eventForm.value.location,
        author: this.authService.getUserDetails(),
      };

      this.eventService.updateEvent(this.event.id.toString(), body).subscribe(
        () => {
          this.toastrService.success(this.translate.instant('COMPONENT.TOAST.UPDATED_SUCCESSFULLY'));
          this.getEvent();
        },
        (error) => {
          this.toastrService.error(this.translate.instant('COMPONENT.TOAST.UPDATED_INCORRECT'));
        }
      );
    }
  }

  checkAuthor(){

    const actualUser = this.authService.getUserDetails();

    return this.event.author != actualUser;
  }


}
