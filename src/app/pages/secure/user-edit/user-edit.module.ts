import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { ComponentsModule } from "src/app/theme/components/components.module";

import { UserEditPageRoutingModule } from "./user-edit-routing.module";
import { UserEditPage } from "./user-edit.page";
import { LayoutsModule } from "@theme/layouts/layouts.module";
import { ParticalsModule } from "@theme/particals/particals.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    LayoutsModule,
    ParticalsModule,
    UserEditPageRoutingModule,
  ],
  declarations: [UserEditPage],
})
export class UserEditPagePageModule {}
