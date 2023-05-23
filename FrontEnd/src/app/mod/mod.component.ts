import { Component } from '@angular/core';

@Component({
  selector: 'app-mod',
  templateUrl: './mod.component.html',
  styleUrls: ['./mod.component.scss']
})
export class ModComponent {
  tabs = [
    {
      id: 'eventDashboard',
      url: 'eventDashboard',
      icon: { label: 'event', class: 'material-icons-outlined' },
      label: 'COMPONENT.SIDENAV.MOD_EVENT_DASHBOARD',
    },
    {
      id: 'userDashboard',
      url: 'userDashboard',
      icon: { label: 'group', class: 'material-icons-outlined' },
      label: 'COMPONENT.SIDENAV.MOD_USER_DASHBOARD',
    }
  ];
}
