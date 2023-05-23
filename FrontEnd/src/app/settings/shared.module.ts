import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ShowOnlyOnDesktopDirective } from './directives/show-only-on-desktop.directive';
import { ShowOnlyOnMobileDirective } from './directives/show-only-on-mobile.directive';
import { MaterialModule } from './material.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  declarations: [ShowOnlyOnDesktopDirective, ShowOnlyOnMobileDirective],
  exports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ShowOnlyOnDesktopDirective,
    ShowOnlyOnMobileDirective,
  ],
})
export class SharedModule {}
