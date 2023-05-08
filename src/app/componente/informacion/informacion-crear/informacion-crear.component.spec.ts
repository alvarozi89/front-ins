import { ComponentFixture, TestBed } from '@angular/core/testing';

import { informacionCrearComponent } from './informacion-crear.component';

describe('informacionCrearComponent', () => {
  let component: informacionCrearComponent;
  let fixture: ComponentFixture<informacionCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ informacionCrearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(informacionCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
