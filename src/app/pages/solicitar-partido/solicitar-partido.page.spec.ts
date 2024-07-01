import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitarPartidoPage } from './solicitar-partido.page';

describe('SolicitarPartidoPage', () => {
  let component: SolicitarPartidoPage;
  let fixture: ComponentFixture<SolicitarPartidoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarPartidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
