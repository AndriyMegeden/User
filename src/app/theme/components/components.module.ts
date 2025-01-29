import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { TableComponent } from "./table/table.component";
import { NgxTranslateModule } from "@core/plugins/ngx-translate/ngx-translate.module";
import { AuthComponent } from "./auth/auth.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [
      CommonModule,
      RouterModule,
      IonicModule,
      FormsModule,
      ReactiveFormsModule,
      NgxTranslateModule,
    ],
    declarations: [
        AuthComponent,
        TableComponent,
    ],
    exports: [
        AuthComponent,
        TableComponent,
    ],
})
export class ComponentsModule {}
  