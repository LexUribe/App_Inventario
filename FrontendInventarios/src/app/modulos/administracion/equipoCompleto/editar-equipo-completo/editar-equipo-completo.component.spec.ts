import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEquipoCompletoComponent } from './editar-equipo-completo.component';

describe('EditarEquipoCompletoComponent', () => {
  let component: EditarEquipoCompletoComponent;
  let fixture: ComponentFixture<EditarEquipoCompletoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarEquipoCompletoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEquipoCompletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
