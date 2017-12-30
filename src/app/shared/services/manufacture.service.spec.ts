import { TestBed, inject } from '@angular/core/testing';

import { ManufactureService } from './manufacture.service';

describe('ManufactureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManufactureService]
    });
  });

  it('should be created', inject([ManufactureService], (service: ManufactureService) => {
    expect(service).toBeTruthy();
  }));
});
