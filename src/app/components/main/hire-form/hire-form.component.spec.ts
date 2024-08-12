import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireFormComponent } from './hire-form.component';

describe('HireFormComponent', () => {
  let component: HireFormComponent;
  let fixture: ComponentFixture<HireFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HireFormComponent]
    });
    fixture = TestBed.createComponent(HireFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
