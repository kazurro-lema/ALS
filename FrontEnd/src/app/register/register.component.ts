import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService } from '../services/user.service';

import * as shajs from 'sha.js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  emailRegx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {}

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailRegx)]],
      password: ['', Validators.required],
    });
  }

  submit() {

    if (this.registerForm.valid) {

      const body = {
        name: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: shajs('sha256').update(this.registerForm.value.password).digest('hex'),
      };

      this.userService.userRegister(body);
    }
  }
}
