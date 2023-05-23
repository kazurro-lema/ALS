import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthGuardModService } from './services/auth-guard-mod.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.MainDashboardModule),
      },
      {
        path: 'event/form',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./event/components/event-form/event-form.module').then((m) => m.EventFormModule)
      },
      {
        path: 'event/inscription',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./event/components/event-inscription/event-inscription.module').then((m) => m.EventInscriptionModule)
      },
      {
        path: 'event/details',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./event/components/event-details/event-details.module').then((m) => m.EventDetailsModule)
      },
      {
        path: 'mod',
        canActivate: [AuthGuardModService],
        loadChildren: () => import('./mod/mod.module').then((m) => m.ModModule)
      },
      {
        path: 'myEvents',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./my-events/my-events.module').then((m) => m.MyEventsModule),
      },
      {
        path: 'profile',
        canActivate: [AuthGuardService],
        component: ProfileComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
