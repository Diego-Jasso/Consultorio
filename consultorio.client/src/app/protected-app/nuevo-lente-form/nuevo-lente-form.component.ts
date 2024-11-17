import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EstatusList } from '../../compartido/utilerias';

@Component({
  selector: 'app-nuevo-lente-form',
  templateUrl: './nuevo-lente-form.component.html',
  styleUrl: './nuevo-lente-form.component.css'
})
export class NuevoLenteFormComponent {

  readonly EstatusList = EstatusList;

  sinArmazon: boolean = true;
  tipoDeMica: string = "1";
  material: string = "";
  tipo: string = "Tipo";
  tipoLenteDeContacto: string = "Tipo";

  @Input() itemToEdit: { frame: string; lensType: string } | null = null;
  @Input() cotId!: number;
  @Output() addItem = new EventEmitter<{ frame: string; lensType: string }>();
  @Output() closePopup = new EventEmitter<void>();


  ngOnInit() {
    // Pre-fill fields if editing an existing item
  
  }

  onAdd() {
    this.onClose();
  }

  onClose() {
    this.closePopup.emit();
  }

  onSelectionChange(e: any) {
    
  }

  onMaterialChange(e: any) {

  }

  //fetchListaMono(): void {
  //  var observable = this.monoService.GetAll();
  //  observable.subscribe({
  //    next: (_mica: micaMonofocal[]) => this.monofocalList = _mica,
  //    complete: () => this.estado = Estatus.Procesado,
  //    error: (err) => {
  //      this.estado = Estatus.Error;
  //      this.toastr.error(err.error, 'Error', {
  //        timeOut: 4000,
  //        progressAnimation: 'increasing'
  //      });
  //    }
  //  });
  //}
  //fetchListaBi(): void {
  //  var observable = this.biService.GetAll();
  //  observable.subscribe({
  //    next: (_mica: micaBifocal[]) => this.bifocalList = _mica,
  //    complete: () => this.estado = Estatus.Procesado,
  //    error: (err) => {
  //      this.estado = Estatus.Error;
  //      this.toastr.error(err.error, 'Error', {
  //        timeOut: 4000,
  //        progressAnimation: 'increasing'
  //      });
  //    }
  //  });
  //}

  //fetchListaProgre(): void {
  //  this.estado = Estatus.Cargando;
  //  var observable = this.proService.GetAll();
  //  observable.subscribe({
  //    next: (_mica: micaProgresivo[]) => this.progresivoList = _mica,
  //    complete: () => this.estado = Estatus.Procesado,
  //    error: (err) => {
  //      this.estado = Estatus.Error;
  //      this.toastr.error(err.error, 'Error', {
  //        timeOut: 4000,
  //        progressAnimation: 'increasing'
  //      });
  //    }
  //  });
  //}

  //fetchLista(): void {
  //  this.estado = Estatus.Cargando;
  //  var observable = this.lenteDeContactoService.GetAll();
  //  observable.subscribe({
  //    next: (_lente: IlenteDeContacto[]) => this.lenteDeContactoList = _lente,
  //    complete: () =>
  //      this.estado = Estatus.Procesado,
  //    error: (err) => {
  //      this.estado = Estatus.Error;
  //      this.toastr.error(err.error, 'Error', {
  //        timeOut: 4000,
  //        progressAnimation: 'increasing'
  //      });
  //    }
  //  });
  //  if (this.lenteDeContactoList = []) {
  //    this.estado = Estatus.Vacio;
  //  }
  //}
}
