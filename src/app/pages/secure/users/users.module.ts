import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from 'src/app/theme/components/components.module';

import { UsersPageRoutingModule } from './users-routing.module';
import { UsersPage } from './users.page';
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
    UsersPageRoutingModule,
    
  ],
  declarations: [UsersPage]
})
export class UsersPageModule {}
