import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionPointsFormComponent } from './collection-points-form.component';

describe('CollectionPointsFormComponent', () => {
  let component: CollectionPointsFormComponent;
  let fixture: ComponentFixture<CollectionPointsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionPointsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionPointsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
