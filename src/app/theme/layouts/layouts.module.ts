import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgxTranslateModule } from "@core/plugins/ngx-translate/ngx-translate.module";
import { CardLayoutComponent } from "./card-layout/card-table.component";
import { ParticalsModule } from "@theme/particals/particals.module";
import { AuthLayoutComponent } from "./auth-layout/auth-layout.component";
import { SecureLayoutComponent } from "./secure-layout/secure-layout.component";

@NgModule({
    imports: [
      CommonModule,
      RouterModule,
      IonicModule,
      ParticalsModule,
      NgxTranslateModule,
    ],
    declarations: [
      AuthLayoutComponent,
      SecureLayoutComponent,
      CardLayoutComponent,
    ],
    exports: [
      AuthLayoutComponent,
      SecureLayoutComponent,
      CardLayoutComponent,
    ]
})
export class LayoutsModule {}
  