import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MenuService } from '@services/general/menu.service';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent implements OnChanges {
  
  public toggle: boolean = true;
  @Output() onMenuChange = new EventEmitter<boolean>();

  constructor(private router: Router, private menuService: MenuService) {}

  public menuActive: boolean;

  async ngOnChanges() {
  }

  navigateTo(page: string): void {
    this.router.navigate([`/${page}`]);
  }

  ngOnInit() {
    this.menuService.getMenuState().subscribe((state) => {
      this.menuActive = state;
    });
  }
}
