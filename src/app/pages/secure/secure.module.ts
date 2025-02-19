import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SecurePageRoutingModule } from './secure-routing.module';

import { SecurePage } from './secure.page';
import { ComponentsModule } from '@theme/components/components.module';
import { LayoutsModule } from '@theme/layouts/layouts.module';
import { ParticalsModule } from '@theme/particals/particals.module';
import { StatisticComponent } from '@theme/components/statistic/statistic.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SecurePageRoutingModule,
    ComponentsModule,
    LayoutsModule,
    ParticalsModule,
    NgxChartsModule
  ],
  declarations: [SecurePage, StatisticComponent]
})
export class SecurePageModule {}
