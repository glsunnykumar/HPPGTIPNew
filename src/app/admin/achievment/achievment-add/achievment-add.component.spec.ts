import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievmentAddComponent } from './achievment-add.component';

describe('AchievmentAddComponent', () => {
  let component: AchievmentAddComponent;
  let fixture: ComponentFixture<AchievmentAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchievmentAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievmentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
