import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SecureInnerPagesGuard } from './Guards/secure-inner-pages.guard';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { UserComponent } from './Components/user/user.component';
import { AdminComponent } from './Components/admin/admin.component';
import { AuthGuard } from './Guards/auth.guard';

const routes: Routes = [
  {
    path: 'signin',
    component: LoginComponent,
    canActivate: [SecureInnerPagesGuard],
  },
  {
    path: 'signup',
    component: RegisterComponent,
    canActivate: [SecureInnerPagesGuard],
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['customer','admin', 'driver'],
    },
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['admin'],
    },
  },

  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect to Home component on root path
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
