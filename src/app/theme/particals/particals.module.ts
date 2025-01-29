import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgxTranslateModule } from "src/app/_core/plugins/ngx-translate/ngx-translate.module";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";

@NgModule({
    imports: [
      CommonModule,
      RouterModule,
      IonicModule,
      NgxTranslateModule
    ],
    declarations: [
      HeaderComponent,
      FooterComponent,
      NavMenuComponent
    ],
    exports: [
      NgxTranslateModule,
      HeaderComponent,
      FooterComponent,
      NavMenuComponent
    ]
})
export class ParticalsModule {}
  