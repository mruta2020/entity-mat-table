import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityMaterialTableComponent } from './entity-material-table.component';

describe('EntityMaterialTableComponent', () => {
  let component: EntityMaterialTableComponent;
  let fixture: ComponentFixture<EntityMaterialTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntityMaterialTableComponent]
    });
    fixture = TestBed.createComponent(EntityMaterialTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
