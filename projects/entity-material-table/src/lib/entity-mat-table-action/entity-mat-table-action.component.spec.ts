import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityMatTableActionComponent } from './entity-mat-table-action.component';

describe('EntityMatTableActionComponent', () => {
  let component: EntityMatTableActionComponent;
  let fixture: ComponentFixture<EntityMatTableActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntityMatTableActionComponent]
    });
    fixture = TestBed.createComponent(EntityMatTableActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
