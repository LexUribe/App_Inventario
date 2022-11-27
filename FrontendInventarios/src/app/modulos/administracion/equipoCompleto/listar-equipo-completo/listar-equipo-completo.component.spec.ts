import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEquipoCompletoComponent } from './listar-equipo-completo.component';

describe('ListarEquipoCompletoComponent', () => {
  let component: ListarEquipoCompletoComponent;
  let fixture: ComponentFixture<ListarEquipoCompletoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarEquipoCompletoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEquipoCompletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
