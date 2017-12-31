import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedOrderManagerComponent } from './finished-order-manager.component';

describe('FinishedOrderManagerComponent', () => {
  let component: FinishedOrderManagerComponent;
  let fixture: ComponentFixture<FinishedOrderManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishedOrderManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishedOrderManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
