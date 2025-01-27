import { Component, ViewChild } from '@angular/core';
import { EstatusList, TipoMica } from '../../../compartido/utilerias';
import { MicaFormComponent } from './mica-form/mica-form.component';
import { MicaListComponent } from './mica-list/mica-list.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-mica',
    templateUrl: './mica.component.html',
    styleUrl: './mica.component.css',
  standalone: true,
  imports: [CommonModule,MicaFormComponent,MicaListComponent]
})
export class MicasComponent {
  @ViewChild('form') form!: MicaFormComponent;
  @ViewChild('list') list!: MicaListComponent;

  EstatusList = EstatusList;

  onActualizar(is: boolean) {
    this.list?.fetchLista();  }

  onEditar(id: number): void {
    this.form?.cargarDatos(id);
  }

  onCerrar(is: boolean) {
    this.form?.cerrarForm(this.form.addForm);
  }

  onAgregar(is: boolean) {
    this.form?.abrirForm();
  }
 
}
