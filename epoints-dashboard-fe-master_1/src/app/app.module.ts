import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms'; // if ngModel is used then FormsModule needs to be imported
import { jqxChartComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxchart';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

import { ErrorInterceptor, JwtInterceptor } from './_helpers';
import { AlertComponent } from './alert/alert.component';
import { SignupComponent } from './signup/signup.component';
import { SignupVerifyComponent } from './signup-verify/signup-verify.component';
import { ActiveProductComponent } from './dashboard/active-product/active-product.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    AlertComponent,
    jqxChartComponent,
    SignupComponent,
    SignupVerifyComponent,
    ActiveProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
