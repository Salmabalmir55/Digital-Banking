import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './guards/authentification.guard';
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersComponent } from './customers/customers.component';
import { AccountsComponent } from './accounts/accounts.component';
import { ProfileComponent } from './profile/profile.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'unauthorized', component: NotAuthorizedComponent },
  {
    path: 'admin',
    component: AdminTemplateComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'accounts', component: AccountsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
