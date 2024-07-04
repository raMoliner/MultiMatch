import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvitacionesPage } from './invitaciones.page';

describe('InvitacionesPage', () => {
  let component: InvitacionesPage;
  let fixture: ComponentFixture<InvitacionesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
