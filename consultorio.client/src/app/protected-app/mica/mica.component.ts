import { Component, ViewChild } from '@angular/core';
import { EstatusList, TipoMica } from '../../compartido/utilerias';
import { MicaFormComponent } from './mica-form/mica-form.component';
import { MicaListComponent } from './mica-list/mica-list.component';

@Component({
  selector: 'app-mica',
  templateUrl: './mica.component.html',
  styleUrl: './mica.component.css'
})
export class MicasComponent {
  @ViewChild('form') form!: MicaFormComponent;
  @ViewChild('list') list!: MicaListComponent;

  EstatusList = EstatusList;

  onActualizar(mica: TipoMica) {
    switch (mica) {
      case TipoMica.Monofocal:
        this.list?.fetchListaMono();
        break;
      case TipoMica.Progresivo:
        this.list?.fetchListaProgre();
        break;
      case TipoMica.Bifocal:
        this.list?.fetchListaBi();
        break;
      case TipoMica.Tratamiento:
        this.list?.fetchListaTrat();
        break;
      default:
        this.list?.fetchListaMono();
        break;
    }
  }

  onEditar(id: number): void {
    this.form?.cargarDatos(id);
  }

  onCerrar(is: boolean) {
    this.form?.cerrarForm(this.form.addForm);
  }

  onAgregar(mica: TipoMica) {
    this.form?.abrirForm(mica);
  }
  onCambioForm(mica: TipoMica) {
    if (this.form?.mostrarForm) {
      this.form?.abrirForm(mica);
    }
  }
}
