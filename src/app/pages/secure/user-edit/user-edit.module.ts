import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { ComponentsModule } from "src/app/theme/components/components.module";

import { UserEditPageRoutingModule } from "./user-edit-routing.module";
import { UserEditPage } from "./user-edit.page";
import { LayoutsModule } from "@theme/layouts/layouts.module";
import { ParticalsModule } from "@theme/particals/particals.module";
import { EditUserComponent } from "@theme/components/edit-user/edit-user.component";

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
  declarations: [UserEditPage, EditUserComponent],
})
export class UserEditPagePageModule {}
