import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { NgForm} from '@angular/forms'
import { ArmazonService } from '../servicios/armazon.service';
import { Iarmazon, armazon } from '../models/armazon';

//@ViewChild('addForm', null) contactForm: NgForm;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {

  readonly titulo_agregar = "Agregar armazon";
  readonly titulo_editar = "Editar armazon";
  Armazones!: armazon[];
  mostrarLoading: boolean = false;
  editar: boolean = false;
  mostrarForm: boolean = false;

  armazon: Iarmazon = new armazon();
  constructor(private service: ArmazonService) {

  }
  ngOnInit() {
    this.fetchArmazones();
  }
  datasource: any;
  fetchArmazones() {
    this.mostrarLoading = true;
    this.service.GetArmazones().subscribe(data=> {
      this.Armazones = data
      this.datasource = new MatTableDataSource(this.Armazones)
      this.mostrarLoading = false;
      
    })
  }
  displayedColumns: string[] = ['actions','cantidad_disponible','marca', 'modelo', 'color', 'tipo_de_lente','material','precio'];

  public onAgregar() {
    this.editar = false;
    this.mostrarForm = true;
  }
  public onGuardar(armazon: armazon,form:NgForm) {
    if (this.editar) {
      this.updateArmazon(armazon);
    } else {
      this.InsertArmazon(armazon);
    }
    form.resetForm();
    this.mostrarForm = false;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  editRow(row: armazon) {
    this.obtenerDatos(row.armazonid);
    this.editar = true;
    this.mostrarForm = true;
  }

  public obtenerDatos(id: number) {
    this.service.GetId(id).subscribe({
      next: (armazon) => { this.armazon = armazon},
      complete: () => { },
      error: (err) => {
        console.log(err.error);
      }
    })
  }

  public updateArmazon(armazon: armazon) {
    this.service.UpdateArmazon(armazon).subscribe({
      next: (armazon) => console.log("Se edito correctamente el armazon"),
      complete: () => {

      },
      error: (err) => {
        console.log(err.error);
      }
    })
  }

  public InsertArmazon(armazon: armazon) {
    this.service.InsertArmazon(armazon).subscribe({
      next: (armazon) => console.log("Se agrego el armazon"),
      complete: () => {

      },
      error: (err) => {
        console.log(err.error);
      }
    })
  }

  public CloseForm(form:NgForm) {
    form.resetForm();
    this.mostrarForm = false;
  }
}
