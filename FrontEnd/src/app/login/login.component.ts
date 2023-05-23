import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

import * as shajs from 'sha.js';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [''],
    });

    this.userService.autoLogin();
  }

  submit() {
    if (this.loginForm.valid) {
      const body = {
        name: this.loginForm.value.username,
        password: shajs('sha256')
          .update(this.loginForm.value.password)
          .digest('hex'),
        rememberMe: this.loginForm.value.rememberMe,
      };

      this.userService.userLogin(body);
    }
  }

  guest() {
    this.userService.guestLogin();
  }
}
