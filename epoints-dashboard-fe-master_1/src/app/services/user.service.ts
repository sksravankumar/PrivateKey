import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { apiUrl } from '../constants/global';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) {
  }

  signup(data) {
    return this.http.post<any>(`${apiUrl}/api/accounts/signup/`, data)
      .pipe(map(user => {
        return user;
      }));
  }

  // Call this endpoint to send an email to a user with a code so that they can request their password.
  requestToResetPassword(data) {
    return this.http.post<any>(`${apiUrl}/api/accounts/password/reset/`, data)
      .pipe(map(user => {
        return user;
      }));
  }

  // signup verification
  verifySignup(params) {
    const urlParams = {
      params: params
    };

    return this.http.get<any>(`${apiUrl}/api/accounts/signup/verify/`, urlParams)
      .pipe(map(user => {
        return user;
      }));
  }

  // Call this endpoint to verify the password reset code when user click the link in the password reset email
  verifyUserEmail(params) {
    const urlParams = {
      params: params
    };

    return this.http.get<any>(`${apiUrl}/api/accounts/password/reset/verify/`, urlParams)
      .pipe(map(user => {
        return user;
      }));
  }

  // Call this endpoint with the password reset  code and the new password, to reset the user’s password
  resetPassword(data) {
    return this.http.post<any>(`${apiUrl}/api/accounts/password/reset/verified/`, data)
      .pipe(map(user => {
        return user;
      }));
  }

  // Call this endpoint to change a user’s existing password
  changeExistingPassword(data) {
    return this.http.post<any>(`${apiUrl}/api/accounts/password/change/`, data)
      .pipe(map(user => {
        return user;
      }));
  }

  getUser() {
    return this.http.get<any>(`${apiUrl}/api/accounts/users/me/`)
      .pipe(map(user => {
        return user;
      }));
  }
}
