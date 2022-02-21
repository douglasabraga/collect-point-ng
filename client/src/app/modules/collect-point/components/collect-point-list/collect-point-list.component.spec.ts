import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectPointListComponent } from './collect-point-list.component';

describe('CollectionPointsListComponent', () => {
  let component: CollectPointListComponent;
  let fixture: ComponentFixture<CollectPointListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectPointListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectPointListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
