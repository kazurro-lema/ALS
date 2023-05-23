import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';

import { EventService } from '../../../services/event.service';
import { IEvent } from '../../../settings/models/event.interface';

@Component({
  selector: 'app-ban-form',
  templateUrl: './ban-form.component.html',
  styleUrls: ['./ban-form.component.scss']
})
export class BanFormComponent {
  banForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public event: IEvent
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.banForm = this.formBuilder.group({
      ban_desc: [''],
    });
  }

  submit() {
    const body = {
      name: this.event.name,
      description: this.event.description,
      startDate: this.event.startDate,
      endDate: this.event.endDate,
      location: this.event.location,
      author: this.event.author,
      banned: true,
      banDescription: this.banForm.value.ban_desc,
    }

    this.eventService.banEvent(this.event.id, body);

    this.dialogRef.close();
  }
}
