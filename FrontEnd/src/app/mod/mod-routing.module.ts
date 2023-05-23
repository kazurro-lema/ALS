import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { EventDashboardComponent } from "./event-dashboard/event-dashboard.component";
import { ModComponent } from "./mod.component";
import { AuthGuardModService } from "../services/auth-guard-mod.service";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'eventDashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate: [AuthGuardModService],
    component: ModComponent,
    children: [
      {
        path: 'eventDashboard',
        canActivate: [AuthGuardModService],
        loadChildren: () => import('./event-dashboard/event-dashboard.module').then((m) => m.EventDashboardModule)
      },
      {
        path: 'userDashboard',
        canActivate: [AuthGuardModService],
        loadChildren: () => import('./user-dashboard/user-dashboard.module').then((m) => m.UserDashboardModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModRoutingModule {}

export const routedComponents = [EventDashboardComponent];
