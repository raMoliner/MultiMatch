import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClubAdminPage } from './club-admin.page';

describe('ClubAdminPage', () => {
  let component: ClubAdminPage;
  let fixture: ComponentFixture<ClubAdminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
