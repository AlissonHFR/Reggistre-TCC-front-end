import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { NavComponent } from './views/nav/nav.component';
import { ItemMenuComponent } from './views/item-menu/item-menu.component';
import { ItemMenulChildDirective } from './views/item-menu/item-menu-child.directive';
import { CategoryComponent } from './category/category.component';
import { CategoryCreateComponent } from './category/category-create/category-create.component';
import { DialogComponent } from './views/dialog/dialog.component';
import { FieldsComponent } from './views/fields/fields.component';
import { NotifierComponent } from './snack-bar/notifier/notifier.component';
import { TableComponent } from './views/table/table.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CategoryService } from './shared/services/category.service';
import { AuthInterceptor, AuthService } from './shared/services/auth.service';
import { MovementComponent } from './movement/movement.component';
import { MovementCreateComponent } from './movement/movement-create/movement-create.component';
import { MovementService } from './shared/services/movement.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TableComponent,
    DialogComponent,
    FieldsComponent,
    CategoryComponent,
    CategoryCreateComponent,
    NotifierComponent,
    NavComponent,
    ItemMenuComponent,
    ItemMenulChildDirective,
    DashboardComponent,
    MovementComponent,
    MovementCreateComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    //FlexLayoutModule
  ],
  providers: [
    CategoryService,
    MovementService,
    AuthService,
   // ActiveWhenLogged,
    //ActiveWhenNotLogged,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
