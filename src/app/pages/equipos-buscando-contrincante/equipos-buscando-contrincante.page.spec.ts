import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EquiposBuscandoContrincantePage } from './equipos-buscando-contrincante.page';

describe('EquiposBuscandoContrincantePage', () => {
  let component: EquiposBuscandoContrincantePage;
  let fixture: ComponentFixture<EquiposBuscandoContrincantePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EquiposBuscandoContrincantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
