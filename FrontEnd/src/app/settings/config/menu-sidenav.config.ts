import { IMenuSidenav } from '../../settings/models/menu.interface';

export const MENUSIDENAV: IMenuSidenav = {
  top: [
    {
      id: 'mydashboard',
      url: '/dashboard',
      icon: { label: 'dashboard' },
      label: 'COMPONENT.SIDENAV.DASHBOARD',
    },
    {
      id: 'myEvents',
      url: '/myEvents',
      icon: { label: 'event_note' },
      label: 'COMPONENT.SIDENAV.MYEVENTS',
      auth_level: 'USER'
    },
    {
      id: 'new',
      url: '/event/form',
      icon: { label: 'note_add' },
      label: 'COMPONENT.SIDENAV.ADD_EVENT',
      auth_level: 'USER'
    },
  ],
  bottom: [
    {
      id: 'mod',
      url: '/mod',
      icon: { label: 'admin_panel_settings' },
      label: 'COMPONENT.SIDENAV.MOD_DASHBOARD',
      auth_level: 'MOD'
    },
    {
      id: 'profile',
      url: '/profile',
      icon: { label: 'account_circle' },
      label: 'COMPONENT.SIDENAV.PROFILE',
      auth_level: 'USER'
    }
  ]
};
