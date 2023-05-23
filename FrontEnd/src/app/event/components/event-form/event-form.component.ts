import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { EventService } from '../../../services/event.service';
import { AuthService } from '../../../services/auth.service';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit {
  eventForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.initForm();
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

      this.eventService.addEvent(body).subscribe(
        () => {
          this.initForm();
          this.toastrService.success(this.translate.instant('COMPONENT.TOAST.ADDED_SUCCESSFULLY'));
        },
        (error) => {
          this.toastrService.error(this.translate.instant('COMPONENT.TOAST.ADDED_INCORRECT'));
        }
      );
    }
  }
}
