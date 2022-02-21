import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectPointActionCellComponent } from './collect-point-action-cell.component';

describe('CellCollectionPointDateComponent', () => {
  let component: CollectPointActionCellComponent;
  let fixture: ComponentFixture<CollectPointActionCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectPointActionCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectPointActionCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
