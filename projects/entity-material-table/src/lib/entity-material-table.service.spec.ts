import { TestBed } from '@angular/core/testing';

import { EntityMaterialTableService } from './entity-material-table.service';

describe('EntityMaterialTableService', () => {
  let service: EntityMaterialTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntityMaterialTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
