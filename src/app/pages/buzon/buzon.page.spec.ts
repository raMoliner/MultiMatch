import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuzonPage } from './buzon.page';

describe('BuzonPage', () => {
  let component: BuzonPage;
  let fixture: ComponentFixture<BuzonPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BuzonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
