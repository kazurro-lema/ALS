import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DeviceService } from 'src/app/services/devices.service';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/settings/models/user.interface';
import { Subscription } from 'rxjs';

import * as shajs from 'sha.js';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ProfileComponent implements OnInit, OnDestroy {

  userForm: FormGroup;
  emailRegx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

  private subscription: Subscription = new Subscription();
  public classResolution: string;
  public user: IUser;
  public hide: boolean = true;
  public editMode: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private deviceService: DeviceService,
    private userService: UserService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.subscription = this.deviceService
      .getResolution()
      .subscribe((classResolution: string) => (this.classResolution = classResolution));

      this.getUser();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private getUser() {

    const actualUser = this.authService.getUserDetails();

    this.userService.getUser(actualUser).subscribe(
      (data) => {
        this.user = data;

        this.userForm = this.formBuilder.group({
          email: [{ value: this.user.email, disabled: true }, [Validators.required, Validators.pattern(this.emailRegx)]],
          password: [{ value: '', disabled: true }, Validators.required]
        });

      },
      (error) => {}
    );
  }

  setEditMode(){
    this.editMode = !this.editMode;

    if(this.editMode){
      this.userForm.get('email').enable();
      this.userForm.get('password').enable();

    } else {

      this.userForm.get('email').disable();
      this.userForm.get('password').disable();
    }
  }

  updateUser() {
    const actualUser = this.authService.getUserDetails();

    const body = {
      email: this.userForm.value.email,
      password: shajs('sha256').update(this.userForm.value.password).digest('hex'),
      role: "USER"
    };

    this.userService.updateUser(actualUser, body);
  }

  deleteUser() {
    const actualUser = this.authService.getUserDetails();

    this.userService.deleteUser(actualUser);
  }
}
