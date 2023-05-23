import { Component, Input } from '@angular/core';

@Component({
  selector: 'title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent {

  @Input() eventCount = 0;
  @Input() textTitle: string;

  constructor() {}
}
