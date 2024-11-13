import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EstatusList } from '../../compartido/utilerias';

@Component({
  selector: 'app-nuevo-lente-form',
  templateUrl: './nuevo-lente-form.component.html',
  styleUrl: './nuevo-lente-form.component.css'
})
export class NuevoLenteFormComponent {

  readonly EstatusList = EstatusList;
 frames: string[] = ['Frame A', 'Frame B', 'Frame C']; // Add actual frame options
  lensTypes: string[] = ['Mica Monofocal', 'Mica Progresiva', 'Mica Bifocal', 'Lente de Contacto'];

  selectedFrame: string = '';
  selectedLensType: string = '';

  @Input() itemToEdit: { frame: string; lensType: string } | null = null;
  @Input() cotId!: number;
  @Output() addItem = new EventEmitter<{ frame: string; lensType: string }>();
  @Output() closePopup = new EventEmitter<void>();


  ngOnInit() {
    // Pre-fill fields if editing an existing item
    if (this.itemToEdit) {
      this.selectedFrame = this.itemToEdit.frame;
      this.selectedLensType = this.itemToEdit.lensType;
    }
  }

  onAdd() {
    this.addItem.emit({ frame: this.selectedFrame, lensType: this.selectedLensType });
    this.onClose();
  }

  onClose() {
    this.closePopup.emit();
  }
}
