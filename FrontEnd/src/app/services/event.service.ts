import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { ApiService } from "./api.service";
import { IEvent } from "../settings/models/event.interface";
import { IAttendee } from "../settings/models/attendee.interface";
import { AuthService } from '../services/auth.service';
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";


@Injectable({
  providedIn: "root",
})
export class EventService {

  constructor(
    private api: ApiService,
    private authService: AuthService,
    private translate: TranslateService,
    private toastrService: ToastrService,
  ) {}

  public getEvents(): Observable<any> {

    return this.api.getTypeRequest('events').pipe(
      map((res: any) => {

        const events: BehaviorSubject<IEvent[]> = res;

        return events;
      })
    );
  }

  public getEvent(id: number): Observable<IEvent> {

    return this.api.getTypeRequest('events/' + id).pipe(
      map((res: any) => {

        const events: IEvent = res.data;

        return events;
      })
    );
  }
  public getMyEvents(): Observable<any> {

    return this.api.getTypeRequest('events').pipe(
      map((res: any) => {

        const events: IEvent[] = res;

        const actualUser = this.authService.getUserDetails();

        return events.filter(event=>event.author == actualUser);
      })
    );
  }

  public addEvent(body: any): Observable<any> {

    return this.api.postTypeRequest('events', body);
  }

  public updateEvent(id: string, body: any): Observable<any> {

    return this.api.putTypeRequest('events/' + id, body);
  }

  public deleteEvent(id: number): Observable<any> {

    return this.api.deleteTypeRequest('events/' + id);
  }

  public banEvent(id: number, body: any) {

    this.api.putTypeRequest('events/' + id, body).subscribe((res: any) => {

      if (res.status == 200) {

        this.toastrService.success(this.translate.instant('COMPONENT.TOAST.BANNED_SUCCESSFULLY'));
      } else {

        this.toastrService.error(this.translate.instant('COMPONENT.TOAST.BANNED_INCORRECT'));
      }
    })
  }

  public inscriptToEvent(body: any): Observable<any>{

    return this.api.postTypeRequest('attendees', body);
  }

  public deInscriptToEvent(body: any): Observable<any>{

    return this.api.deleteTypeRequest('attendees/' + body.num + '/' + body.name);
  }

  public subsc(body: any): Observable<IAttendee> {

    return this.api.getTypeRequest('attendees/' + body.num + '/' + body.name).pipe(
      map((res: any) => {
        const attendees: IAttendee = res.data;
        return attendees;
      })
    );
  }
}
