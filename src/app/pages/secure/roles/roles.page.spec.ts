import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RolesPage } from './roles.page';

describe('RolesPage', () => {
  let component: RolesPage;
  let fixture: ComponentFixture<RolesPage>;

  beforeEach(waitForAsync () => {
    fixture = TestBed.createComponent(RolesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
