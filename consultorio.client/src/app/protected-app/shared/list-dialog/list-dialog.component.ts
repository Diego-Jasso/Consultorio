import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EstatusList } from '../../../compartido/utilerias';

@Component({
    selector: 'app-list-dialog',
    templateUrl: './list-dialog.component.html',
    styleUrl: './list-dialog.component.css',
    standalone: false
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
