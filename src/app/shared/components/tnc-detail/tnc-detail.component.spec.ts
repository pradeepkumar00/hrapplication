import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TncDetailComponent } from './tnc-detail.component';

describe('TncDetailComponent', () => {
  let component: TncDetailComponent;
  let fixture: ComponentFixture<TncDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TncDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TncDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
