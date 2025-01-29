import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { ComponentsModule } from '@theme/components/components.module';
import { LayoutsModule } from '@theme/layouts/layouts.module';
import { LoginPageRoutingModule } from '../login/login-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    ComponentsModule,
    LayoutsModule
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
