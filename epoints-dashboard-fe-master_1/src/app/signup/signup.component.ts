import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // if ngModule is used then FormModule is required
import { first } from 'rxjs/operators';

import { AlertService, AuthenticateService, UserService } from '../services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertService: AlertService,
    private authenticateService: AuthenticateService,
    private router: Router
  ) {
    // redirect to dashboard if already logged in
    if (this.authenticateService.currentUserValue) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  onSubmit() {
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }

    let userData = {
      first_name: this.f.firstName.value,
      last_name: this.f.lastName.value,
      email: this.f.email.value,
      password: this.f.password.value
    };
    this.userService.signup(userData)
      .pipe(first())
      .subscribe(
        data => {
          let message = 'Thank you for registering. Please verify your email address.'
          this.alertService.success(message, true);
          this.router.navigate(['/']);
        },
        error => {
          this.alertService.error(error);
        });
  }

}

