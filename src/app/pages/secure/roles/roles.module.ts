import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RolesPageRoutingModule } from './roles-routing.module';

import { RolesPage } from './roles.page';
import { ComponentsModule } from '@theme/components/components.module';
import { LayoutsModule } from '@theme/layouts/layouts.module';
import { ParticalsModule } from '@theme/particals/particals.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RolesPageRoutingModule,
    ComponentsModule,
    LayoutsModule,
    ParticalsModule,
  ],
  declarations: [RolesPage]
})
export class RolesPageModule {}
