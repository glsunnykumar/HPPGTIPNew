import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievmentEditComponent } from './achievment-edit.component';

describe('AchievmentEditComponent', () => {
  let component: AchievmentEditComponent;
  let fixture: ComponentFixture<AchievmentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchievmentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievmentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
