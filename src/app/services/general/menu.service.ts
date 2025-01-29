import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menuState = new BehaviorSubject<boolean>(false);

  getMenuState() {
    return this.menuState.asObservable();
  }

  toggleMenu() {
    this.menuState.next(!this.menuState.value);
  }
}
