import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { MenuService } from "@services/general/menu.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {



  constructor(private menuService: MenuService) {}

  async ngOnInit() {}



   logo = 'assets/icons/general/logo.svg';
  

  changeToggle() {
    this.menuService.toggleMenu();
  }
}
