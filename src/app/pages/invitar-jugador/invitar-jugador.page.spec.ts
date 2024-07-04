import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvitarJugadorPage } from './invitar-jugador.page';

describe('InvitarJugadorPage', () => {
  let component: InvitarJugadorPage;
  let fixture: ComponentFixture<InvitarJugadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitarJugadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
