import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  public menuActive: boolean;

  constructor() { }

  ngOnInit() {
  }
  menuChange(event){
    this.menuActive = event;
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

}
