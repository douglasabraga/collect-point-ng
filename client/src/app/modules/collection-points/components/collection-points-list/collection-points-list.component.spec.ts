import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionPointsListComponent } from './collection-points-list.component';

describe('CollectionPointsListComponent', () => {
  let component: CollectionPointsListComponent;
  let fixture: ComponentFixture<CollectionPointsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionPointsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionPointsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
