import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufactureManagerComponent } from './manufacture-manager.component';

describe('ManufactureManagerComponent', () => {
  let component: ManufactureManagerComponent;
  let fixture: ComponentFixture<ManufactureManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufactureManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufactureManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
