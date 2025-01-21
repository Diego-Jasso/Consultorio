import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EstatusList } from '../../compartido/utilerias';
import { ArmazonService } from '../servicios/armazon.service';
import { IArmazon } from '../models/armazon';
import { ToastrService } from 'ngx-toastr';
import { ArticuloCotizacionModel } from '../models/armazon.cotizacion';
import { ArticuloCotizacionService } from '../servicios/armazon.cotizacion.service';
import { lenteDeContactoService } from '../servicios/lente.de.contacto.service';
import { MicaService } from '../servicios/mica.service';
import { IlenteDeContacto, Mica } from '../models/mica';

@Component({
  selector: 'app-nuevo-lente-form',
  templateUrl: './nuevo-lente-form.component.html',
  styleUrl: './nuevo-lente-form.component.css'
})
export class NuevoLenteFormComponent {

  readonly EstatusList = EstatusList;

  tipoDeMica: string = "MON";
  tipo: string = "Tipo";
  armazonList: IArmazon[] = [];
  micaList: Mica[] = [];
  lenteDeContactoList: IlenteDeContacto[] = [];
  armazon: number = -1;
  mica: number = 1;
  articuloCotizacion: ArticuloCotizacionModel = {} as ArticuloCotizacionModel;
  mostrarMica = true;
  mostrarLente = false;
  isEdit = false;
  busquedaTexto = '';

  @Input() itemToEdit: { armazon: number; mica: number } | null = null;
  @Input() cotId!: number;
  @Output() addItem = new EventEmitter<{ armazon: number; mica: number }>();
  @Output() closePopup = new EventEmitter<void>();
  @Output() refresh = new EventEmitter<void>();

  constructor(private armazonService: ArmazonService,
    private toastr: ToastrService,
    private artservice: ArticuloCotizacionService,
    private lenteDeContactoService: lenteDeContactoService,
    private micaService:MicaService
  ) { }

  ngOnInit() {
    this.fetchListaArmazones();
    this.fetchListaMica(this.tipoDeMica);
    if (this.itemToEdit != null) {
      this.armazon = this.itemToEdit.armazon;
      this.mica = this.itemToEdit.mica;
      this.isEdit = true;
    }
  }

  onAdd() {
    this.onAgregar();
  }

  onClose() {
    this.closePopup.emit();
  }

  onSelectionChange(e: any) {
    switch (this.tipoDeMica) {
      case 'MON':
      case 'PRO':
      case 'BIF':
        this.fetchListaMica(this.tipoDeMica);
        this.mostrarMica = true;
        this.mostrarLente = false;
        break;
      case 'LDC':
        this.fetchListaLenteDeContact();
        this.mostrarMica = false;
        this.mostrarLente = true;
        break;
      case 'SIN':
        this.mostrarMica = false;
        this.mostrarLente = false;
        break;
    }
  }


  fetchListaArmazones(): void {
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

  fetchListaMica(filtro:string): void {
    var observable = this.micaService.GetAllWithFilter(filtro);
    observable.subscribe({
      next: (_mica: Mica[]) => this.micaList = _mica,
      complete: () => { },
      error: (err) => {
        this.toastr.error(err.error, 'Error', {
          timeOut: 4000,
          progressAnimation: 'increasing'
        });
      }
    });
  }

  fetchListaLenteDeContact() {
    var observable = this.lenteDeContactoService.GetAll();
    observable.subscribe({
      next: (_lente: IlenteDeContacto[]) => this.lenteDeContactoList = _lente,
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
    this.articuloCotizacion.micaid =  this.mica;
    this.artservice.Agregar(this.articuloCotizacion).subscribe({
      next: (armazon) => this.toastr.success('El registro fue agregado correctamente'),
      complete: () => {
        this.onClose();
        this.refresh.emit();
      },
      error: (err) => {
        this.toastr.error(err.error, 'Error', {
          timeOut: 4000,
          progressAnimation: 'increasing'
        })
      }
    });
  }

  onEditar() {

  }
}
