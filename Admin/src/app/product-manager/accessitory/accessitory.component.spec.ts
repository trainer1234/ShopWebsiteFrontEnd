import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessitoryComponent } from './accessitory.component';

describe('AccessitoryComponent', () => {
  let component: AccessitoryComponent;
  let fixture: ComponentFixture<AccessitoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessitoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessitoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
