import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-auth-user-edit',
  templateUrl: './user-edit.page.html',
  styleUrls: ['./user-edit.page.scss'],
})
export class UserEditPage implements OnInit {

  public menuActive: boolean;

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }


  goBack() {
    this.navCtrl.back(); // Повертає на попередню сторінку
    console.log('back')
  }

  menuChange(event){
    this.menuActive = event;
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

}
