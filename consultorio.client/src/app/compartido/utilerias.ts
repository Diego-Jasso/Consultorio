import { NgForm } from "@angular/forms";

export function validarCamposRequeridos(formulario: NgForm): void {
  Object.keys(formulario.controls).forEach((nombre) => {
    const control = formulario.controls[nombre];
    control.markAsTouched({ onlySelf: true });
    control.markAsDirty({ onlySelf: true });
  });
}

export enum Estatus {
  Cargando, Procesado, Vacio, Error
}

export enum EstatusList {
  Catalogo,Cotizacion,BusquedaCotizacion
} 

export enum TipoMica {
  LenteDeContacto, Monofocal, Progresivo, Bifocal, Tratamiento
} 
