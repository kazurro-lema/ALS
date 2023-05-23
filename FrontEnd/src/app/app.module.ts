import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { SharedModule } from './settings/shared.module';
import { InterceptorService } from './services/interceptor-service.service';
import { SidenavComponent } from './main/components/sidenav/sidenav.component';
import { SidenavItemComponent } from './main/components/sidenav/item/sidenav-item.component';
import { HeaderModule } from './main/components/header/header.module';
import { RegisterComponent } from './register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ModComponent } from './mod/mod.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SidenavComponent,
    SidenavItemComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    ModComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    HeaderModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/',
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
