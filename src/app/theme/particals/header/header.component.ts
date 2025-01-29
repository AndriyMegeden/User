import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@core/auth-service/services/auth.service";
import { MenuController } from "@ionic/angular";
import { MenuService } from "@services/general/menu.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  public email: string = localStorage.getItem('email') || '';
  constructor(
    private menuService: MenuService,
    private authService: AuthService,
    private router: Router
  ) {}

 ngOnInit() {}

  logo = "assets/icons/general/logo.svg";

  changeToggle() {
    this.menuService.toggleMenu();
  }

  
}
