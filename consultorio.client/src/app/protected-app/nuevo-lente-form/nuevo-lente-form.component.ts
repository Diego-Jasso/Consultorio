import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EstatusList } from '../../compartido/utilerias';
import { ArmazonService } from '../servicios/armazon.service';
import { IArmazon } from '../models/armazon';
import { ToastrService } from 'ngx-toastr';
import { ArticuloCotizacionModel } from '../models/armazon.cotizacion';
import { ArticuloCotizacionService } from '../servicios/armazon.cotizacion.service';

@Component({
  selector: 'app-nuevo-lente-form',
  templateUrl: './nuevo-lente-form.component.html',
  styleUrl: './nuevo-lente-form.component.css'
})
export class NuevoLenteFormComponent {

  readonly EstatusList = EstatusList;

  sinArmazon: boolean = true;
  tipoDeMica: string = "MON";
  material: string = "";
  tipo: string = "Tipo";
  tipoLenteDeContacto: string = "Tipo";
  armazonList: IArmazon[] = [];
  armazon: number = -1;
  articuloCotizacion: ArticuloCotizacionModel = {} as ArticuloCotizacionModel;

  @Input() itemToEdit: { frame: string; lensType: string } | null = null;
  @Input() cotId!: number;
  @Output() addItem = new EventEmitter<{ frame: string; lensType: string }>();
  @Output() closePopup = new EventEmitter<void>();

  constructor(private armazonService: ArmazonService,
    private toastr: ToastrService,
    private artservice: ArticuloCotizacionService,
  ) { }

  ngOnInit() {
    this.fetchLista();
  }

  onAdd() {
    this.onAgregar();
  }

  onClose() {
    this.closePopup.emit();
  }

  onSelectionChange(e: any) {
    console.log(this.tipoDeMica);
  }

  onMaterialChange(e: any) {
    console.log(this.material);
  }

  fetchLista(): void {
    var observable = this.armazonService.GetAll();
    observable.subscribe({
      next: (_armazon: IArmazon[]) => this.armazonList = _armazon,
      complete: () => { },
      error: (err) => {
        this.toastr.error(err.error, 'Error', {
          timeOut: 4000,
          progressAnimation: 'increasing'
        });
      }
    });
  }

  onAgregar() {
    this.articuloCotizacion.armazonid = this.armazon;
    this.articuloCotizacion.cotizacionid = this.cotId;
    this.articuloCotizacion.cantidad = 1;
    this.articuloCotizacion.tipoMica = this.tipoDeMica;
    this.artservice.Agregar(this.articuloCotizacion).subscribe({
      next: (armazon) => this.toastr.success('El registro fue agregado correctamente'),
      complete: () => {
        this.onClose();
      },
      error: (err) => {
        this.toastr.error(err.error, 'Error', {
          timeOut: 4000,
          progressAnimation: 'increasing'
        })
      }
    });
  }
}
