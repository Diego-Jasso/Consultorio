import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { EstatusList } from '../../../compartido/utilerias';
import { CommonModule } from '@angular/common';
import { AccesorioListComponent } from '../../Components/accesorio/accesorio-list/accesorio-list.component';
import { ArmazonListComponent } from '../../Components/armazon/armazon-list/armazon-list.component';

@Component({
    selector: 'app-list-dialog',
    templateUrl: './list-dialog.component.html',
    styleUrl: './list-dialog.component.css',
  standalone: true,
  imports: [CommonModule,ArmazonListComponent,AccesorioListComponent,MatDialogModule]
})
export class ListDialogComponent {
  EstatusList = EstatusList;
  constructor(
    public dialogRef: MatDialogRef<ListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { Lista:string,Id:number }
  ) {
    dialogRef.disableClose = true;
  }

  //ngOnInit() {
  //  this.dialogRef.updateSize('30%', '30%');
  //}
}
