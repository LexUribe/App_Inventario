import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEquipoCompletoComponent } from './crear-equipo-completo.component';

describe('CrearEquipoCompletoComponent', () => {
  let component: CrearEquipoCompletoComponent;
  let fixture: ComponentFixture<CrearEquipoCompletoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearEquipoCompletoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearEquipoCompletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
