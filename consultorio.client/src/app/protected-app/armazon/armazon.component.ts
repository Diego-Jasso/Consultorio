import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { NgForm} from '@angular/forms'
import { ArmazonService } from '../servicios/armazon.service';
import { IArmazon } from '../models/armazon';
import { ArmazonListComponent } from './armazon-list/armazon-list.component';
import { ArmazonFormComponent } from './armazon-form/armazon-form.component';


@Component({
  selector: 'app-armazon',
  templateUrl: './armazon.component.html',
  styleUrl: './armazon.component.css',
})
export class ArmazonesComponent {

  @ViewChild('form') form!: ArmazonFormComponent;
  @ViewChild('list') list!: ArmazonListComponent;


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
