import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JugadorAdminPage } from './jugador-admin.page';

describe('JugadorAdminPage', () => {
  let component: JugadorAdminPage;
  let fixture: ComponentFixture<JugadorAdminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JugadorAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
