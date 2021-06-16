import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryCreateComponent } from './category/category-create/category-create.component';
import { CategoryComponent } from './category/category.component';
import { MovementCreateComponent } from './movement/movement-create/movement-create.component';
import { MovementComponent } from './movement/movement.component';
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
      {
        path: 'category',
        component: CategoryComponent
      },
      {
        path: 'category/new',
        component: CategoryCreateComponent
      },
      {
        path: 'movement',
        component: MovementComponent
      },
      {
        path: 'movement/new',
        component: MovementCreateComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
