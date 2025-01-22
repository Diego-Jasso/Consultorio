import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../../models/DialogData';

@Component({
    selector: 'app-modal-eliminar',
    templateUrl: './modal-eliminar.component.html',
    styleUrl: './modal-eliminar.component.css',
    standalone: true
})
export class ModalEliminarComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalEliminarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.dialogRef.updateSize('20%', '20%');
  }
}
