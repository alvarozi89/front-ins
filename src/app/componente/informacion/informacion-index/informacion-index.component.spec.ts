import { ComponentFixture, TestBed } from '@angular/core/testing';

import { informacionIndexComponent } from './informacion-index.component';

describe('informacionIndexComponent', () => {
  let component: informacionIndexComponent;
  let fixture: ComponentFixture<informacionIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ informacionIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(informacionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
