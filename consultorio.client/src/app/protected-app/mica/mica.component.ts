import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { NgForm } from '@angular/forms'
import { MicaService } from '../servicios/mica.service';
import { Imica, mica } from '../models/mica';


@Component({
  selector: 'app-mica',
  templateUrl: './mica.component.html',
  styleUrl: './mica.component.css'
})
export class MicasComponent {

  readonly titulo_agregar = "Agregar mica";
  readonly titulo_editar = "Editar mica";
  Micas: mica[] = [];
  mostrarLoading: boolean = false;
  editar: boolean = false;
  mostrarForm: boolean = false;


  mica: mica = new mica();
  Imica: Imica = new mica();
  constructor(private service: MicaService) {

  }
  ngOnInit() {
    this.fetchMicas();
  }
  datasource: any;
  fetchMicas() {
    this.mostrarLoading = true;
    this.service.GetAll().subscribe(data => {
      this.Micas = data
      this.datasource = new MatTableDataSource(this.Micas)
      this.mostrarLoading = false;

    })
  }
  displayedColumns: string[] = ['actions', 'cantidad_disponible', 'nombre', 'descripcion', 'precio'];

  public onAgregar() {
    this.editar = false;
    this.mostrarForm = true;
  }
  public onGuardar(mica: mica, form: NgForm) {
    if (this.editar) {
      this.update(mica);
    } else {
      this.insert(mica);
    }
    form.resetForm();
    this.mostrarForm = false;
    this.fetchMicas();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  editRow(row: mica) {
    this.obtenerDatos(row.micaid);
    this.editar = true;
    this.mostrarForm = true;
  }

  delete(row: mica) {
    this.Delete(row);
    this.fetchMicas();
  }
  public obtenerDatos(id: number) {
    this.service.GetById(id).subscribe({
      next: (mica) => { this.mica = mica },
      complete: () => { },
      error: (err) => {
        console.log(err.error);
      }
    })
  }

  public update(mica: mica) {
    this.service.Update(mica).subscribe({
      next: (mica) => console.log("Se edito correctamente la mica"),
      complete: () => {

      },
      error: (err) => {
        console.log(err.error);
      }
    })
  }

  public insert(mica: Imica) {
    this.service.Insert(mica).subscribe({
      next: (mica) => console.log("Se agrego la mica"),
      complete: () => {

      },
      error: (err) => {
        console.log(err.error);
      }
    })
  }

  public Delete(mica: mica) {
    this.service.Delete(mica.micaid).subscribe({
      next: (armazon) => console.log("Se elimino la mica"),
      complete: () => {

      },
      error: (err) => {
        console.log(err.error);
      }
    });
  }

  public CloseForm(form: NgForm) {
    form.resetForm();
    this.mostrarForm = false;
  }
}
