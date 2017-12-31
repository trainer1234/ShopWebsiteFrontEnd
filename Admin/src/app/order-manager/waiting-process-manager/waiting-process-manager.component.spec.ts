import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingProcessManagerComponent } from './waiting-process-manager.component';

describe('WaitingProcessManagerComponent', () => {
  let component: WaitingProcessManagerComponent;
  let fixture: ComponentFixture<WaitingProcessManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingProcessManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingProcessManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
