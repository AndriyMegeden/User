import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-auth-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  public menuActive: boolean;

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }


  goBack() {
    this.navCtrl.back(); // Повертає на попередню сторінку
  }

  menuChange(event){
    this.menuActive = event;
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

}
