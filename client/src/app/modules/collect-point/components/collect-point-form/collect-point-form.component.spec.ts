import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectPointFormComponent } from './collect-point-form.component';

describe('CollectionPointsFormComponent', () => {
  let component: CollectPointFormComponent;
  let fixture: ComponentFixture<CollectPointFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectPointFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectPointFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
