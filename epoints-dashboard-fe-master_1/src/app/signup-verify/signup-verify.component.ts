import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticateService, UserService } from '../services';

@Component({
  selector: 'app-signup-verify',
  templateUrl: './signup-verify.component.html',
  styleUrls: ['./signup-verify.component.css']
})
export class SignupVerifyComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private alertService: AlertService,
    private authenticateService: AuthenticateService,
    private router: Router,
    private userService: UserService
  ) {
    // redirect to dashboard if already logged in
    if (this.authenticateService.currentUserValue) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        if (params.code) {
          this.userService.verifySignup(params)
            .pipe(first())
            .subscribe(
              data => {
                this.alertService.success('User verified. Please login.', true);
                this.router.navigate(['/']);
              },
              error => {
                this.alertService.error('Invalid link.', true);
                this.router.navigate(['/']);
              });
        } else {
          let message = 'Invalid link.'
          this.alertService.error(message, true);
          this.router.navigate(['/']);
        }
      });
  }

}
