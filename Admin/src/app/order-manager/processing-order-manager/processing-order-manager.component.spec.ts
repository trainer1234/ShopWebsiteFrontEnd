import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingOrderManagerComponent } from './processing-order-manager.component';

describe('ProcessingOrderManagerComponent', () => {
  let component: ProcessingOrderManagerComponent;
  let fixture: ComponentFixture<ProcessingOrderManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessingOrderManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessingOrderManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
