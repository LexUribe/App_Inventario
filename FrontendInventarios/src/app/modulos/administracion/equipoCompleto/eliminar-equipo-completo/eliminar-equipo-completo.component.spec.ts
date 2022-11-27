import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarEquipoCompletoComponent } from './eliminar-equipo-completo.component';

describe('EliminarEquipoCompletoComponent', () => {
  let component: EliminarEquipoCompletoComponent;
  let fixture: ComponentFixture<EliminarEquipoCompletoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarEquipoCompletoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarEquipoCompletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
