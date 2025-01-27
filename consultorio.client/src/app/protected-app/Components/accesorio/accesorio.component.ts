import { Component, ViewChild } from '@angular/core';
import { AccesorioFormComponent } from './accesorio-form/accesorio-form.component';
import { AccesorioListComponent } from './accesorio-list/accesorio-list.component';
import { EstatusList } from '../../../compartido/utilerias';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-accesorio',
    templateUrl: './accesorio.component.html',
    styleUrl: './accesorio.component.css',
  standalone: true,
  imports: [CommonModule,AccesorioFormComponent,AccesorioListComponent]
})
export class AccesoriosComponent {

  @ViewChild('form') form!: AccesorioFormComponent;
  @ViewChild('list') list!: AccesorioListComponent;

  EstatusList = EstatusList;

  onActualizar(is: boolean) {
    this.list?.fetchLista();
  }

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
