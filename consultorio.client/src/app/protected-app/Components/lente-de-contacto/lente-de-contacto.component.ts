import { Component, ViewChild } from '@angular/core';
import { LenteDeContactoFormComponent } from './lente-de-contacto-form/lente-de-contacto-form.component';
import { LenteDeContactoListComponent } from './lente-de-contacto-list/lente-de-contacto-list.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-lente-de-contacto',
    templateUrl: './lente-de-contacto.component.html',
    styleUrl: './lente-de-contacto.component.css',
  standalone: true,
  imports: [CommonModule,LenteDeContactoFormComponent,LenteDeContactoListComponent]
})
export class LenteDeContactoComponent {
  @ViewChild('form') form!: LenteDeContactoFormComponent;
  @ViewChild('list') list!: LenteDeContactoListComponent;

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
