import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent }      from './login/login.component';
import { DashboardComponent }      from './dashboard/dashboard.component';
import { ActiveProductComponent }      from './dashboard/active-product/active-product.component';
import { SignupComponent }      from './signup/signup.component';
import { SignupVerifyComponent }      from './signup-verify/signup-verify.component';

import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'home',
    children: [
      { path: 'active-products', component: ActiveProductComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'signup', component: SignupComponent },
  { path: 'signup/verify', component: SignupVerifyComponent },

  // otherwise redirect to dashboard
  { path: '**', redirectTo: '/home' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
