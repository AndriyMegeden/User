import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from "@angular/core";
import { MenuController } from "@ionic/angular";
import { Router } from "@angular/router";
import { MenuService } from "@services/general/menu.service";
import { AuthService } from "@core/auth-service/services/auth.service";

@Component({
  selector: "app-nav-menu",
  templateUrl: "./nav-menu.component.html",
  styleUrls: ["./nav-menu.component.scss"],
})
export class NavMenuComponent implements OnChanges {
  public toggle: boolean = true;
  @Output() onMenuChange = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private menuService: MenuService,
    private authService: AuthService
  ) {}

  public menuActive: boolean;

  async ngOnChanges() {}

// Перенаправлення
  navigateTo(page: string): void {
    if (page === 'users') {
      this.router.navigate(['/users']); 
    } else if (page === 'create') {
      this.router.navigate(['/create']); 
    } else if (page === 'user-edit') {  
      this.router.navigate(['/user-edit']);
    }
  }
  
  

  logout() {
    this.authService.logOut();
    this.router.navigate([""]);
    console.log("logout");
  }

  ngOnInit() {
    this.menuService.getMenuState().subscribe((state) => {
      this.menuActive = state;
    });
  }
}
