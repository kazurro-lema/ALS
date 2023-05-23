import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { AuthService } from '../../../services/auth.service';

import { IEvent } from '../../../settings/models/event.interface';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-event-inscription',
  templateUrl: './event-inscription.component.html',
  styleUrls: ['./event-inscription.component.scss']
})
export class EventInscriptionComponent implements OnInit {

  eventForm: FormGroup;
  event: IEvent;
  eventId: number;
  author: string;
  suscrito: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private translate: TranslateService,
  ) {
    this.author = "";
    this.suscrito = false;

 }

  ngOnInit() {
    this.initForm();

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.eventId = params['eventId'];
      this.getEvent();
      this.isSubscribed();
    });


  }

  initForm() {
    this.eventForm = this.formBuilder.group({
      name: ['', Validators.required],
      desc: ['', Validators.required],
      dateIni: [new Date(), Validators.required],
      dateEnd: [new Date(), Validators.required],
      location: ['']
    });
  }

  getEvent() {
    this.eventService.getEvent(this.eventId).subscribe(
      (data) => {
        this.event = data;

        this.eventForm = this.formBuilder.group({
          id: [{ value: this.eventId, disabled: true }, [Validators.required]],
          name: [{ value: this.event.name, disabled: true }, [Validators.required]],
          desc: [{ value: this.event.description, disabled: true }],
          dateIni: [{ value: this.event.startDate, disabled: true }],
          dateEnd: [{ value: this.event.endDate, disabled: true }, [Validators.required]],
          location: [{ value: this.event.location, disabled: true }, Validators.required],
          author: [{ value: this.event.author, disabled: true }, Validators.required]
        });

        this.author = this.event.author;
      },
      (error) => {}
    );
  }

  submit() {
    const body = {
      num: this.eventId,
      name: this.authService.getUserDetails()
    };

    if(!this.suscrito){

      this.eventService.inscriptToEvent(body).subscribe(
        () => {
          this.suscrito = true;
          this.toastrService.success(this.translate.instant('COMPONENT.TOAST.INSCRIPTED_SUCCESSFULLY'));
        },
        (error) => {
          this.suscrito = false;
          this.toastrService.error(this.translate.instant('COMPONENT.TOAST.INSCRIPTED_INCORRECT'));
        }
      );
    }else{
      this.eventService.deInscriptToEvent(body).subscribe(
        () => {
          this.suscrito = false;
          this.toastrService.success(this.translate.instant('COMPONENT.TOAST.ABANDONED_SUCCESSFULLY'));
        },
        (error) => {
          this.suscrito = false;
          this.toastrService.error(this.translate.instant('COMPONENT.TOAST.ABANDONED_INCORRECT'));
        }
      );
    }
  }

  isSubscribed(){
    const body = {
      num: this.eventId,
      name: this.authService.getUserDetails()
    };
    this.eventService.subsc(body).subscribe(
      () => {
        this.suscrito = true;
      },
      (error) => {
        this.suscrito = false;
      }
    );
  }
}
