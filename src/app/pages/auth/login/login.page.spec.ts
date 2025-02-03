import { LoginPage } from './login.page';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';


describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [], // Додай потрібні модулі, наприклад, IonicModule
    }).compileComponents();
  }));
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
