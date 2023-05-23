import { NgModule } from '@angular/core';
import { SharedModule } from '../settings/shared.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserActionsComponent } from './components/user-list/user-actions/user-actions.component';
@NgModule({
  declarations: [
    UserListComponent,
    UserCardComponent,
    UserActionsComponent
  ],
  imports: [SharedModule],
  exports: [UserListComponent],
})
export class UserModule {}
