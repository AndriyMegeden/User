import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  // використовує значення menuState з localStorage
  private menuState = new BehaviorSubject<boolean>(this.getStoredMenuState());

  getMenuState() {
    return this.menuState.asObservable();
  }

  toggleMenu() {
    // міняє значення menuState і зберігає його в localStorage
    const newState = !this.menuState.value;
    this.menuState.next(newState);
    localStorage.setItem('menuState', JSON.stringify(newState));
  }
  // перевіряє чи є значення menuState в localStorage і витягує його 
  private getStoredMenuState(): boolean {
    const storedState = localStorage.getItem('menuState');
    return storedState !== null ? JSON.parse(storedState) : false;
  }
}
