import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ArmazonService } from './servicios/armazon.service';
export interface armazon {
  marca: string;
  modelo: string;
  color: string;
  tipo_de_lente: string;
  material: string;
  precio: number;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {

  Armazones!: armazon[];
  mostrarLoading: boolean = false;
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
  displayedColumns: string[] = ['actions','marca', 'modelo', 'color', 'tipo_de_lente','material','precio'];
 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }
}
