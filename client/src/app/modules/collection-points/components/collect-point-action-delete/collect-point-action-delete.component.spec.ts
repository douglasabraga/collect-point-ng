import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectPointActionDeleteComponent } from './collect-point-action-delete.component';

describe('CollectPointActionDeleteComponent', () => {
  let component: CollectPointActionDeleteComponent;
  let fixture: ComponentFixture<CollectPointActionDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectPointActionDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectPointActionDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
