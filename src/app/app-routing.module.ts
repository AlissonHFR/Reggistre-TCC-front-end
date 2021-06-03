import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LoginComponent } from './views/login/login.component';
import { NavComponent } from './views/nav/nav.component';

const routes: Routes = [
  //{ path: '', component: LoginComponent, pathMatch: 'full', canActivate: [ActiveWhenNotLogged] },
  //{ path: 'login', component: LoginComponent, canActivate: [ActiveWhenNotLogged] },
  { path: '', component: LoginComponent, pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  {
    path: 'dashboard',
    component: NavComponent,
    //canActivate: [ActiveWhenLogged],
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'users',
        component: LoginComponent
      },
      // {
      //   path: 'users/new',
      //   component: UserCreateComponent
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
