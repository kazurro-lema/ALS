import { Component, Input } from '@angular/core';
import { IUser } from '../../../settings/models/user.interface';


@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {

  @Input() user: IUser;

  constructor() {}
}
