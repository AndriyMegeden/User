import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';

import { ComponentsModule } from '@theme/components/components.module';
import { LayoutsModule } from '@theme/layouts/layouts.module';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '@core/auth-service/services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ComponentsModule,
    LayoutsModule,
    HttpClientModule
  ],
  declarations: [LoginPage],
  providers: [AuthService]
})
export class LoginPageModule {}
