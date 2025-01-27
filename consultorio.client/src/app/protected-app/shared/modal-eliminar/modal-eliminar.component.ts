import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../../models/DialogData';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-modal-eliminar',
    templateUrl: './modal-eliminar.component.html',
    styleUrl: './modal-eliminar.component.css',
  standalone: true,
  imports: [CommonModule,MatDialogModule]
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
