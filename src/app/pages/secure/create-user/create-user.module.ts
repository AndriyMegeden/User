import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from 'src/app/theme/components/components.module';
import { CreateUserPageRoutingModule } from './create-user-routing.module';
import { CreateUserPage } from './create-user.page';
import { LayoutsModule } from '@theme/layouts/layouts.module';
import { ParticalsModule } from '@theme/particals/particals.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    LayoutsModule,
    ParticalsModule,
    CreateUserPageRoutingModule, // Виправлено: імпортуємо правильний роутинг
  ],
  declarations: [CreateUserPage]
})
export class CreateUserPageModule {} // Виправлено: модуль має називатися CreateUserPageModule
